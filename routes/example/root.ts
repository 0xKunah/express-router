import Route from "../../classes/Route";
import db from "../../utils/db";

const route = new Route("/");

route.get(async (req, res) => {
    return res.json({ message: "Hello World from example" })
});

export default route;