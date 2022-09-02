import { CustomerDTO } from "src/DTO";
import { Customer, Service } from "src/entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class ORMCustomer {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    phone!: string;



    static import(instance: Customer): ORMCustomer {
        const entity = new ORMCustomer();
        
        entity.id = instance.id;
        entity.name = instance.name;
        entity.phone = instance.phone;

        return entity;
    }

    export(): Customer {
        const retrivedData: CustomerDTO = {
            id: this.id,
            name: this.name,
            phone: this.phone,
        };

        const buildCustomer = Customer.build(retrivedData);
        if (buildCustomer.isFailure) {
            throw buildCustomer.error;
        }
        return buildCustomer.getValue();
    }
}