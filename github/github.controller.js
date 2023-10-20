import express from "express";
import * as mock from "./github.service.js";

const router = express.Router();

router.get("/get/apis", getApis);
router.get("/get/deployments/:hash", getDeployments);
router.get("/get/deployment/:hash", getDeployment);

function getApis(req, res, next) {
  mock
    .getApis()
    .then(function (result) {
      res.json(result);
    })
    .catch((err) => next(err));
}

function getDeployments(req, res, next) {
  mock
    .getDeployments(req.params)
    .then(function (result) {
      res.json(result);
    })
    .catch((err) => next(err));
}

function getDeployment(req, res, next) {
  mock
    .getDeployment(req.params)
    .then(function (result) {
      res.json(result);
    })
    .catch((err) => next(err));
}

export default router;
