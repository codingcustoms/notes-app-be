export const signIn = async (req, res) => {
  try {
    res.status(200).send('User logged in successfully!!');
  } catch (error) {
    res.status(500).json(error);
  }
};
