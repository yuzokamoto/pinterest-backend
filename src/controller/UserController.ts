import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../database/BaseDatabase";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body;
      const token = await this.userBusiness.createUser(input);
      res.status(200).send({ message: `User created successfully`, token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body;
      const token = await this.userBusiness.login(input);
      res.status(200).send({ message: `User logged in successfully`, token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };
}