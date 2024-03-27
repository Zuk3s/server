import JWT from "jsonwebtoken";

export const verifyToken = async (request, response, next) => {
  try {
    let token = request.header("Autorization");
    if ("token") return response.status(403).send("Acess Denied");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = JWT.verify(token, process.env.JWT_SECRET);
    request.user = verified;
    next();
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
