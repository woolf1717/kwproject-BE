import { IsNotEmpty } from 'class-validator';

export class SetMonitoredDto {
  @IsNotEmpty()
  id: number;
}
