import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, Between } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const product = await this.productsService.findOne(createSaleDto.productId);
    if (product.quantity < createSaleDto.quantity) {
      throw new Error('Quantité insuffisante en stock');
    }

    const sale = this.salesRepository.create({
      ...createSaleDto,
      date: new Date(), // Ajoutez cette ligne pour définir la date actuelle
      product: product
    });
    await this.salesRepository.save(sale);

    // Mise à jour du stock
    await this.productsService.update(product.id, {
      quantity: product.quantity - createSaleDto.quantity,
    });

    return sale;
  }

  async findAll(): Promise<Sale[]> {
    return this.salesRepository.find({ relations: ['product'] });
  }

  async getHistoricalData(): Promise<Sale[]> {
    // Implémentez la logique pour récupérer les données historiques
    return this.salesRepository.find({
      relations: ['product'],
      order: { date: 'DESC' },
      take: 100, // Par exemple, récupérer les 100 dernières ventes
    });
  }

  async generateWeeklyReport() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const sales = await this.salesRepository.find({
      where: { date: MoreThanOrEqual(oneWeekAgo) },
      relations: ['product'],
    });

    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.quantity * sale.product.price, 0);

    return {
      period: { start: oneWeekAgo, end: new Date() },
      totalSales,
      totalRevenue,
      // Ajoutez d'autres statistiques pertinentes
    };
  }

  async getSalesByProductAndPeriod(productId: number, startDate: Date, endDate: Date): Promise<Sale[]> {
    return this.salesRepository.find({
      where: {
        product: { id: productId },
        date: Between(startDate, endDate),
      },
      relations: ['product'],
    });
  }
}
