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

    @Column({ type: 'varchar', length: 64, nullable: false })
    service_id!: string;

    static import(instance: Customer): ORMCustomer {
        const entity = new ORMCustomer();

        entity.name = instance.name;
        entity.phone = instance.phone;
        entity.service_id = instance.service_id;

        return entity;
    }

    export(): Customer {
        const retrivedData: CustomerDTO = {
            id: this.id,
            name: this.name,
            phone: this.phone,
            service_id: this.service_id,
        };

        const buildCustomer = Customer.build(retrivedData);
        if (buildCustomer.isFailure) {
            throw buildCustomer.error;
        }
        return buildCustomer.getValue();
    }
}