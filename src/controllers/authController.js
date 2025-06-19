import jwt from 'jsonwebtoken';

// googleCallback
export const googleCallback = (req, res) => {
  try {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false // true production ke liye (https me)
    });

    res.redirect(`${process.env.CLIENT_URL}/editor`);
  } catch (error) {
    console.error("Error during google callback", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};



export const getUser = (req,res) =>{
    try {
        if(!req.user) {
            res.status(401).json({message:'User not authinticated'})
        }
        res.json({
            user:req.user
        })
    } catch (error) {
        console.error('Error fetching user details',error)
        res.status(500).json({message:'Internal server error'})
    }
}