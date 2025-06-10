const Gradient = require("../models/gradient.js");


// GET all gradients
exports.getAllGradients = async (req, res) => {
  try {
    const gradients = await Gradient.find({});
    res.json(gradients);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// POST insert default gradients (once)
exports.insertDefaultGradients = async (req, res) => {
  const defaultGradients = [
    { colors: ["#020024", "#090979","#00D4FF"] },
    { colors: ["#2A7B9B", "#57C785","#EDDD53"] },
    { colors: ["#833AB4", "#FD1D1D","#FCB045"] },
    { colors: ["#97BF37", "#3F3C69","#F700C6"] },
    { colors: ["#571D1D", "#ff867a","#0EF0E4"] },
    { colors: ["#c6ffdd","#0B37E6", "#fbd786"] },
    { colors: ["#43e97b", "#38f9d7"] },
    { colors: ["#30cfd0", "#330867"] },
    { colors: ["#5ee7df", "#b490ca"] },
    { colors: ["#FD1D1D", "#764ba2"] },
    { colors: ["#89f7fe", "#66a6ff"] },
    { colors: ["#ff758c", "#833AB4"] },
    { colors: ["#43e97b", "#38f9d7","#B31E1E"] },
    { colors: ["#30cfd0", "#330867","#B31E1E"] },
    { colors: ["#5ee7df", "#b490ca","#000000"] },
    { colors: ["#FD1D1D", "#764ba2","#7F0CCC"] },
    { colors: ["#89f7fe", "#66a6ff","#E80787"] },
    { colors: ["#ff758c", "#833AB4","#038707"] },
  ];

  try {
    // Clear old data (optional)
    await Gradient.deleteMany({});

    // Insert new data
    await Gradient.insertMany(defaultGradients);

    res.status(201).json({ message: "Default gradients inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to insert gradients", error });
  }
};
