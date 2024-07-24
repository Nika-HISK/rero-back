import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Listener } from "../entities/listener.entity";
import { Repository } from "typeorm";


@Injectable()
export class listenersRepository {

    
    constructor(
        @InjectRepository(Listener)
        private readonly listenerRepo:Repository<Listener>
    ) {}



}