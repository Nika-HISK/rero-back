import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Listener } from "../entities/listener.entity";

@Injectable()
export class ListenersRepository {
    constructor(
        @InjectRepository(Listener)
        private readonly listenerRepo: Repository<Listener>
    ) {}

    async todays() {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1); 

        return await this.listenerRepo.find({
            where: {
                createdAt: Between(startDate, endDate),
            },
        });
    }


    async weeks() {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);

        return await this.listenerRepo.find({
            where: {
                createdAt: Between(startDate, endDate),
            },
        });
    }




    async months() {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 30);

        return await this.listenerRepo.find({
            where: {
                createdAt: Between(startDate, endDate),
            },
        });
    }
}