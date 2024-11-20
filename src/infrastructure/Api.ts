import 'reflect-metadata';
import { IService } from 'src/types/service.interfaces';

export class Api implements IService {
    private static instance: Api;
    private routePrefix: string = '/api';
}