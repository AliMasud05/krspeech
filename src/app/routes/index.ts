import express from "express";

import { AuthRoutes } from "../modules/Auth/auth.routes";
import { UserRoutes } from "../modules/User/user.routes";
import { SupportTicketRoutes } from "../modules/SupportTicket/support-ticket.route";
import { BlogRoutes } from "../modules/Blog/blog.route";
import { TeamRoutes } from "../modules/Teams/team.route";
import { ContactSubmissionRoutes } from "../modules/contact/contact.route";

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
    route: TeamRoutes,
  },
  {
    path: "/support-ticket",
    route: SupportTicketRoutes,
  },
  {
    path: "/blog",
    route:BlogRoutes,
  },
  {
    path: "/contact",
    route: ContactSubmissionRoutes,
  }
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
