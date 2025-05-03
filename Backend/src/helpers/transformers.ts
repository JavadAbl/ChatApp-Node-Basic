import { ClassConstructor, plainToInstance } from "class-transformer";

/**
 * Transform a single entity into a DTO
 */
export function toDto<T, V>(dtoClass: ClassConstructor<T>, data: V): T;

/**
 * Transform an array of entities into DTOs
 */
export function toDto<T, V>(dtoClass: ClassConstructor<T>, data: V[]): T[];

/**
 * Shared implementation
 */
export function toDto<T, V>(dtoClass: ClassConstructor<T>, data: V | V[]): T | T[] {
  return plainToInstance(dtoClass, data as any, {
    excludeExtraneousValues: true,
  });
}
