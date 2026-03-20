const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");
const { createCompany } = require("../models/companyModel");

const signToken = (user) =>
  jwt.sign({ userId: user.id, companyId: user.company_id }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "7d",
  });

const register = async (req, res, next) => {
  try {
    const { email, password, companyName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let companyId = null;
    if (companyName) {
      const company = await createCompany({
        name: companyName,
        legalForm: "SAS",
        taxRegime: "is",
        vatRegime: "reel_normal",
        employeesCount: 0,
      });
      companyId = company.id;
    }

    const user = await createUser({ email, password: hashedPassword, companyId });
    const token = signToken(user);

    return res.status(201).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        company_id: user.company_id,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
};
