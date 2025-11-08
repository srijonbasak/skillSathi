const draftTemplates = {
    tailoring: {
        title: 'পরিমিত দর্জি সেবা',
        description: 'আপনার পরিমাপ অনুযায়ী ঘরে বসেই শাড়ি, সালোয়ার-কামিজ ও ব্লাউজ সেলাই। সময়মতো ডেলিভারি ও মানের নিশ্চয়তা।'
    },
    catering: {
        title: 'হোম ক্যাটারিং',
        description: 'বাড়িতে বানানো স্বাস্থ্যসম্মত পদ। ছোট ইভেন্ট ও অফিস লাঞ্চের জন্য প্রি-অর্ডার করুন।'
    }
};
const priceHints = {
    tailoring: 800,
    catering: 2500,
    craft: 1200,
    tutoring: 1500,
    beauty: 1000
};
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const mockDraftGig = async (payload) => {
    await wait(900);
    const base = (payload.skill && draftTemplates[payload.skill]) || {
        title: 'এআই তৈরি শিরোনাম',
        description: 'প্রদত্ত তথ্য থেকে বানানো বিবরণ। প্রকাশের আগে আপনার ভাষায় পরিমার্জন করে নিন।'
    };
    if (!payload.hint) {
        return base;
    }
    return {
        title: `${base.title} • ${payload.hint.slice(0, 18)}`,
        description: `${base.description}\n\n${payload.hint}`
    };
};
export const mockSuggestPrice = async (payload) => {
    await wait(700);
    const base = (payload.skill && priceHints[payload.skill]) || 1500;
    if (!payload.location) {
        return base;
    }
    return payload.location.includes('Dhaka') ? base + 200 : base - 100;
};
