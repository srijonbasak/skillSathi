export type SkillOption = {
  id: string;
  nameBn: string;
  nameEn: string;
};

export const skills: SkillOption[] = [
  { id: 'tailoring', nameBn: 'দর্জির কাজ', nameEn: 'Tailoring' },
  { id: 'catering', nameBn: 'হোম ক্যাটারিং', nameEn: 'Home catering' },
  { id: 'craft', nameBn: 'হস্তশিল্প', nameEn: 'Handicraft' },
  { id: 'tutoring', nameBn: 'টিউটরিং', nameEn: 'Tutoring' },
  { id: 'beauty', nameBn: 'বিউটি সেবা', nameEn: 'Beauty services' }
];
