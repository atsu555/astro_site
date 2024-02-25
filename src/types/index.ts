export type ComponentProps<T extends (...args: any) => any> = Parameters<T>[0];

export type SomeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
