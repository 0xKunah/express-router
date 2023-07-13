import Route from "../../classes/Route";
import db from "../../utils/db";

const route = new Route("/:id");

route.get(async (req, res) => {
    const { id } = req.params;
    return res.json({ message: `Hello World from example ${id}` })
});

export default route;