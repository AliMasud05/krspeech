import express from "express";

import { AuthRoutes } from "../modules/Auth/auth.routes";
import { UserRoutes } from "../modules/User/user.routes";
import { teamRoutes } from "../modules/Teams/team.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route:UserRoutes,
  },
  {
    path: "/teams",
    route: teamRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
