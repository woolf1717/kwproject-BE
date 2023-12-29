export type CreateUserType = {
  username: string;
  password: string;
};

export type UpdateUserType = {
  username: string;
  password: string;
};

export type CreateBookType = {
  departmentCode: string;
  bookNumber: string;
  controlNumber: string;
};

export type BookType = {
  id: number;
  departmentCode: string;
  bookNumber: string;
  controlNumber: string;
  title: string;
  sectionZero: string;
  sectionOneDesignation: string;
  sectionOneRightsList: string;
  sectionTwo: string;
  sectionThree: string;
  sectionFour: string;
};
