export type Upazila = {
  name: string;
};

export type District = {
  name: string;
  upazilas: Upazila[];
};

export type Division = {
  name: string;
  districts: District[];
};

export const divisions: Division[] = [
  {
    name: 'Dhaka',
    districts: [
      {
        name: 'Dhaka',
        upazilas: [{ name: 'Dhanmondi' }, { name: 'Mirpur' }, { name: 'Uttara' }, { name: 'Keraniganj' }]
      },
      {
        name: 'Gazipur',
        upazilas: [{ name: 'Tongi' }, { name: 'Sreepur' }, { name: 'Kapasia' }]
      }
    ]
  },
  {
    name: 'Chattogram',
    districts: [
      {
        name: 'Chattogram',
        upazilas: [{ name: 'Pahartali' }, { name: 'Kotwali' }, { name: 'Rangunia' }]
      },
      {
        name: "Cox's Bazar",
        upazilas: [{ name: 'Cox’s Bazar Sadar' }, { name: 'Teknaf' }, { name: 'Ukhia' }]
      }
    ]
  },
  {
    name: 'Rajshahi',
    districts: [
      {
        name: 'Rajshahi',
        upazilas: [{ name: 'Paba' }, { name: 'Godagari' }, { name: 'Tanore' }]
      },
      {
        name: 'Natore',
        upazilas: [{ name: 'Natore Sadar' }, { name: 'Singra' }]
      }
    ]
  }
];
