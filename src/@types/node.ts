export interface Node {
  id: number;
  name: string;
  position: {
    x: number;
    y: number;
  };
  partner?: number;
  parents?: number[];
}
