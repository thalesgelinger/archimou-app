export interface Person {
  id: Number;
  name: String;
  gender: String;
  partner?: Person;
  parents?: Person[];
  siblings?: Person[];
  children?: Person[];
}
