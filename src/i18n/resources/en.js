const en = {
    brand: {
        name: 'SkillSathi',
        tagline: 'Where hidden skills earn safely'
    },
    a11y: {
        skipToContent: 'Skip to main content'
    },
    nav: {
        languageToggle: 'Language',
        langBn: 'Bangla',
        langEn: 'English',
        links: {
            home: 'Home',
            register: 'Register',
            login: 'Login',
            dashboard: 'Dashboard'
        },
        actions: {
            createGig: 'Create gig',
            wallet: 'Wallet',
            chat: 'Chat',
            newRequest: 'New request'
        },
        auth: {
            login: 'Sign in',
            logout: 'Sign out'
        },
        themeToggle: 'Theme',
        themeOptionSathi: 'Sathi',
        themeOptionSokti: 'Sokti',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        mobileBarLabel: 'Primary actions'
    },
    common: {
        comingSoon: 'This area is coming soon.',
        loading: 'Loading…',
        apply: 'Apply',
        regenerate: 'Regenerate',
        cancel: 'Cancel',
        confirm: 'Confirm',
        ok: 'OK',
        close: 'Close',
        dismiss: 'Dismiss',
        statusReady: 'Ready',
        statusDraft: 'Draft'
    },
    ai: {
        assist: 'AI Assist',
        suggestionTitle: 'Suggested draft',
        helper: 'AI only suggests content. Review before applying.',
        priceHint: 'Data-backed price hint',
        apply: 'Apply',
        regenerate: 'Try again',
        suggestedPrice: 'Suggested price',
        error: 'AI suggestions are unavailable. Please try again.',
        confirmApplyTitle: 'Apply AI suggestion?',
        confirmApplyBody: 'Your current text stays unchanged until you confirm.',
        companion: {
            label: 'AI Chatbot',
            cta: 'AI Companion',
            title: 'SkillSathi AI Companion',
            subtitle: 'Draft gigs, estimate prices, or get safety tips anytime.',
            welcome: 'Hi! I am your SkillSathi AI companion. How can I help?',
            aiLabel: 'AI',
            userLabel: 'You',
            actions: {
                draft: 'Draft gig',
                price: 'Price hint',
                safety: 'Safety tip'
            },
            prompts: {
                draft: 'Please draft a tailoring gig.',
                price: 'What price fits this tailoring gig?',
                safety: 'Share a safety reminder.'
            },
            sampleHint: 'Client wants at-home tailoring',
            safetyTip: 'Keep conversations inside SkillSathi and avoid sharing personal numbers.'
        }
    },
    voice: {
        start: 'Start voice',
        stop: 'Stop',
        helper: 'bn-BD voice input with optional typing fallback.',
        unsupportedTitle: 'Voice is unavailable',
        unsupportedCta: 'Use text input',
        tooltip: 'Speak in Bangla (bn-BD)',
        statusIdle: 'Not listening',
        statusListening: 'Listening…'
    },
    chatbots: {
        placeholder: 'Type your message…',
        safety: 'Do not share phone/email—your number stays hidden here.',
        sathi: {
            title: 'Sathi — helper for clients',
            subtitle: 'Write clear briefs in Bangla and get AI summaries.',
            welcome: 'What work do you need? Tell me in Bangla and I will craft a tidy brief.',
            response: 'Here is a clean brief for "{topic}". Send it to providers or tweak as needed.',
            quick: {
                cleaning: 'House cleaning',
                tailor: 'Tailor blouses',
                babysit: 'Babysitting',
                data: 'Data entry'
            }
        },
        sokti: {
            title: 'Sokti — helper for women providers',
            subtitle: 'Share your skill and get gig title, description, and price ideas.',
            welcome: 'What is your skill? I will suggest gig title, description, and price.',
            hint: 'Women-focused gigs',
            quick: {
                tailoring: 'Tailoring',
                cooking: 'Home cooking',
                beauty: 'Beauty service',
                tuition: 'Tuition'
            }
        }
    },
    validation: {
        required: 'This field is required.',
        phone: 'Enter a valid Bangladeshi phone number (01XXXXXXXXX).',
        nid: 'NID must be 10 / 13 / 17 digits.',
        division: 'Select a division.',
        district: 'Select a district.',
        upazila: 'Select an upazila.',
        wallet: 'Wallet number must follow BD mobile format.',
        skills: 'Pick at least one skill.',
        email: 'Provide a valid email.'
    },
    phone: {
        helper: '11-digit mobile number (01XXXXXXXXX)',
        maskedBanner: 'Chats hide phone/email by default.'
    },
    forms: {
        provider: {
            heading: 'Provider details',
            nameBn: 'Full name (Bangla)',
            nameEn: 'Full name (English)',
            phone: 'Phone number',
            division: 'Division',
            district: 'District',
            upazila: 'Upazila',
            area: 'Area / Village',
            skills: 'Select skills',
            wallet: 'bKash / Nagad number',
            email: 'Email (optional)',
            nid: 'NID (optional)'
        },
        client: {
            heading: 'Client details',
            name: 'Full name',
            orgType: 'Type',
            phone: 'Phone number'
        },
        gig: {
            heading: 'Gig details',
            skill: 'Service category',
            title: 'Title',
            description: 'Description',
            price: 'Price (BDT)',
            publish: 'Publish gig',
            priceSuggest: 'Suggest price'
        },
        request: {
            heading: 'What do you need?',
            details: 'Describe or speak your need',
            priceRange: 'Price range (BDT)',
            submit: 'Post request'
        },
        wallet: {
            amount: 'Withdrawal amount',
            method: 'Mobile money'
        },
        location: {
            division: 'Division',
            district: 'District',
            upazila: 'Upazila',
            placeholder: 'Select'
        },
        errorSummaryTitle: 'Please fix the highlighted fields',
        errorSummaryIntro: 'Select an item below to jump to that field.',
        clientOrgTypes: {
            individual: 'Individual',
            sme: 'SME',
            ngo: 'NGO',
            company: 'Company'
        }
    },
    banner: {
        phoneHidden: 'Phone numbers stay hidden by default.',
        safeTrade: 'Keep every deal inside SkillSathi for full protection.'
    },
    pages: {
        home: {
            heroTitle: 'SkillSathi - Turn skills into income',
            heroSubcopy: 'Find work faster with AI guidance, chat safely with masked numbers, and get paid by bKash/Nagad.',
            trustLine: 'Your number stays hidden in chat',
            heroNote: 'AI guidance + women-led support every step.',
            ctaPrimary: 'Start now',
            ctaSecondary: 'Show demo',
            heroCards: {
                request: {
                    title: 'Post a request',
                    subtitle: 'Explain your need in Bangla and let AI tidy it up.',
                    helper: 'Draft sample',
                    suggestion: 'Need a tailor for 3 sari blouses this week.'
                },
                gig: {
                    title: 'Gig creator',
                    subtitle: 'Pick your skill and get instant copy.',
                    pricePill: 'Suggest price ৳1200',
                    helper: 'Auto-filled once you select a skill.'
                }
            },
            personaSection: {
                title: 'Two paths, one SkillSathi',
                body: 'Sathi keeps the blue-sky search for clients and Sokti is the pink helper that wakes for women providers. Both honor safety and Bangla-first stories so the platform feels human.'
            },
            personas: {
                sathi: {
                    tag: 'Blue path',
                    title: 'Sathi — search & briefs for clients',
                    preview: 'Browse gigs, save favourites, and send requests without sharing your number.',
                    detail: 'Sathi keeps the experience calm and blue-sky: search curated gigs, read masked provider stories, and start safe chats in Bangla or English.',
                    bullets: [
                        'Filter by category, price, and availability to find the right provider quickly.',
                        'Tap masked profiles with trust badges and verified skills.',
                        'Send request briefs or open masked chats that stay inside SkillSathi.'
                    ]
                },
                sokti: {
                    tag: 'Pink helper',
                    title: 'Sokti — gig coach for women providers',
                    preview: 'Register as a provider and Sokti appears to help name gigs, describe packages, and set safe prices.',
                    detail: 'Sokti is the red/pink companion for women providers: it suggests gig copy, pricing ideas, and safety reminders so you can focus on earning with confidence.',
                    bullets: [
                        'Describe your skill and Sokti drafts gig titles, descriptions, and pricing.',
                        'Receive Bangla-first price hints that match local demand plus payout reminders.',
                        'See safety nudges before sensitive chats and keep every conversation masked.'
                    ],
                    note: 'Sokti chat only appears when a verified woman provider is logged in so the assistant can focus on gig creation and safety.'
                }
            },
            differentiators: {
                title: 'Why SkillSathi feels different',
                body: 'We translated the pitch-deck promises into UI: blue Sathi for discovery, pink Sokti for creation, always explaining how women stay safe while earning.',
                cards: [
                    {
                        key: 'safety',
                        title: 'Women-safe defaults',
                        body: 'Every brief masks phone numbers, allows women-only requests, and keeps a panic/report shortcut visible.',
                        points: [
                            'Masked chat and dispute-ready logs for each conversation.',
                            'Neighborhood tags keep jobs close to home or trusted hubs.',
                            'Contextual reminders warn buyers before they ask for personal info.'
                        ]
                    },
                    {
                        key: 'ai',
                        title: 'Sokti AI gig coach',
                        body: 'Once a woman provider logs in, the pink Sokti dock wakes up to draft gigs, titles, and prices in Bangla within seconds.',
                        points: [
                            'Auto-draft titles, descriptions, and sample packages pulled from PDF research.',
                            'Price guidance tuned to Dhaka pilot rates plus smart alerts for under-pricing.',
                            'Fraud-and-learning loop tips before publishing a gig.'
                        ]
                    },
                    {
                        key: 'payout',
                        title: 'Instant payout + trust rails',
                        body: 'Wallet ties bKash/Nagad style flows to every gig so caregivers see real cashflow, not just leads.',
                        points: [
                            'Transparent fee summary before confirming any booking.',
                            'One-tap withdraw simulation with success/error feedback.',
                            'Community badges and mentorship prompts to build credibility.'
                        ]
                    }
                ]
            },
            impactStats: {
                title: 'Impact we are chasing',
                body: 'Grounded in the PDF roadmap: start in Dhaka, then unlock nationwide trust as blue Sathi search meets pink Sokti creation.',
                items: [
                    { key: 'waitlist', value: '10K+', label: 'women providers waitlisted', helper: 'Dhaka caregivers and home chefs ready to onboard.' },
                    { key: 'requests', value: '3 min', label: 'to draft a request', helper: 'Sathi briefs + Sokti templates reduce typing anxiety.' },
                    { key: 'payout', value: '60 sec', label: 'wallet payout simulation', helper: 'Demo mirrors instant bKash/Nagad disbursement.' },
                    { key: 'support', value: '24/7', label: 'women-led support', helper: 'Mentors and moderators cover safety escalations.' }
                ]
            },
            workingJourney: {
                title: 'How the working model runs',
                body: 'Lifted from the “Working” section of the PDF: Sathi handles the brief, Sokti coaches the gig, and payouts stay instant.',
                items: [
                    {
                        key: 'brief',
                        title: 'Speak or type your need',
                        body: 'Clients talk in Bangla or type a sentence, and Sathi polishes the request with AI, voice input, and safety hints.',
                        helper: 'Matches the deck note on voice input + AI-assisted briefs.'
                    },
                    {
                        key: 'coach',
                        title: 'Sokti drafts the gig',
                        body: 'When a woman provider signs in, Sokti (pink) suggests titles, descriptions, and fair prices tied to Dhaka demand.',
                        helper: 'Reflects the AI-assisted listing promise in the working doc.'
                    },
                    {
                        key: 'payout',
                        title: 'Wallet, payouts, mentorship',
                        body: 'Masked chat flows into wallet actions, instant payout simulation, and women-led mentors for disputes.',
                        helper: 'Echoes the PDF focus on instant payouts + trust programs.'
                    }
                ]
            },
            highlightsTitle: 'What SkillSathi delivers today',
            highlights: [
                {
                    key: 'search',
                    title: 'Blue-sky gig search',
                    body: 'Sathi surfaces vetted gigs, lets you save favourites, and translates briefs in Bangla.'
                },
                {
                    key: 'provider',
                    title: 'Provider-first guidance',
                    body: 'Sokti coaches women providers with gig drafts, pricing ideas, and safety nudges before any chat.'
                },
                {
                    key: 'safety',
                    title: 'Trust & payouts',
                    body: 'Masked contacts, reporting, and local payout rails (bKash/Nagad) keep every meeting safe.'
                }
            ],
            howItWorks: {
                title: 'How SkillSathi works',
                cards: [
                    { key: 'register', title: 'Register', body: 'Bangla-first forms with full guidance.' },
                    { key: 'create', title: 'Create or request', body: 'One click AI copy & pricing support.' },
                    { key: 'safe', title: 'Safe chat & payout', body: 'Masked chat plus bKash/Nagad payouts.' }
                ]
            },
            categoriesTitle: 'Popular categories',
            categories: [
                { key: 'tailoring', label: 'Tailoring' },
                { key: 'cooking', label: 'Home cooking' },
                { key: 'beauty', label: 'Beauty' },
                { key: 'tuition', label: 'Tuition' },
                { key: 'handicraft', label: 'Handicraft' },
                { key: 'dataEntry', label: 'Data entry' },
                { key: 'babysitting', label: 'Babysitting' },
                { key: 'housekeeping', label: 'Housekeeping' }
            ],
            trust: {
                title: 'Trust & safety',
                list: [
                    'Masked contact details for every chat.',
                    'Report & resolve with one tap.',
                    'Women-led support team, 7 days a week.'
                ],
                description: 'We screen listings, blur phone/email, and log every payment trail so disputes are easy to resolve.',
                info: 'Follow community guidelines',
                link: 'View guidelines'
            },
            ctaBand: {
                title: 'Publish your skill or try the demo first.',
                body: 'SkillSathi feels like a real teammate - AI guidance plus human support.'
            },
            aiDemoTitle: 'AI demo',
            aiDemoDraftTitle: 'At-home tailoring service',
            aiDemoDraftDescription: 'Custom fits with same-day delivery.'
        },
        register: {
            title: 'Register',
            providerTab: 'Provider',
            clientTab: 'Client',
            submit: 'Submit form',
            success: 'Demo success! Data stays on this device only.'
        },
        login: {
            title: 'Sign in',
            description: 'Prototype login: enter your phone to jump straight to a dashboard.',
            continue: 'Continue',
            helper: 'Use your 11-digit Bangladeshi number.',
            otpInfo: 'OTP verification will be added later; this is a demo shortcut.',
            loginProvider: 'Login as provider',
            loginClient: 'Login as client'
        },
        providerDashboard: {
            title: 'Provider dashboard',
            createGig: 'Create gig',
            openChat: 'Message client',
            wallet: 'View wallet',
            trustBanner: 'Improve trust by adding your NID.',
            requestsTitle: 'Nearby requests',
            empty: 'No requests yet. Check back soon.',
            sampleRequests: {
                tailoring: 'Boutique tailoring help',
                catering: 'Home catering package',
                craft: 'Handicraft training'
            },
            samplePrices: {
                tailoring: '৳1200',
                catering: '৳2500',
                craft: '৳900'
            },
            profile: {
                name: 'Runa Akter',
                role: 'Boutique tailor • Dhaka pilot',
                bio: 'Women-first gig partner crafting blouse patterns, urgent alterations, and caregiver-friendly home visits.',
                availability: 'Available Sun–Fri • 10am–8pm • Same-day response via Sokti.',
                editCta: 'Edit profile',
                badges: ['Women verified', '90% response rate', 'Sokti mentor-in-training'],
                metrics: [
                    { label: 'Rating', value: '4.9 / 5' },
                    { label: 'Hours available', value: '32h this week' },
                    { label: 'This month', value: '৳18,200 earned' },
                    { label: 'Gigs live', value: '3 packages' }
                ]
            },
            availability: {
                title: 'Availability & gig status',
                gigSwitch: 'Gig live (Book now button visible)',
                bookingSwitch: 'Accepting new bookings & chats',
                helper: 'Toggle off when you need a break—Sathi lets clients know and keeps safety reminders on.'
            },
            monthly: {
                title: 'Monthly sales snapshot',
                helper: 'Track how Sokti drafts turned into paid gigs.',
                total: '৳68,000 in the last 6 months',
                series: [
                    { month: 'Jan', value: 65, label: '৳9.5k' },
                    { month: 'Feb', value: 72, label: '৳11k' },
                    { month: 'Mar', value: 80, label: '৳12.4k' },
                    { month: 'Apr', value: 54, label: '৳8k' },
                    { month: 'May', value: 83, label: '৳13k' },
                    { month: 'Jun', value: 70, label: '৳14.1k' }
                ]
            },
            bookings: {
                title: 'Bookings & negotiations',
                helper: 'Approve book-now requests or continue masked chat before committing.',
                labels: {
                    pending: 'Book request',
                    accepted: 'Booked',
                    counter: 'Counter offer'
                },
                actions: {
                    book: 'Confirm booking',
                    message: 'Message client',
                    counter: 'Review counter offer'
                },
                items: [
                    {
                        id: 'bk-1',
                        client: 'Sami Rahman',
                        gig: 'At-home blouse fitting',
                        date: 'Fri • 4:00 PM',
                        price: '৳1,800',
                        note: 'Client asked for fabric pickup before visit.',
                        state: 'pending'
                    },
                    {
                        id: 'bk-2',
                        client: 'Joya Hossain',
                        gig: 'Uniform tailoring (3 pcs)',
                        date: 'Sat • 11:00 AM',
                        price: '৳2,600',
                        note: 'Booking accepted — confirm drop-off address.',
                        state: 'accepted'
                    },
                    {
                        id: 'bk-3',
                        client: 'BRAC NGO Desk',
                        gig: 'Training-day sari draping',
                        date: 'Sun • 9:00 AM',
                        price: '৳4,500',
                        note: 'They counter offered ৳4,000 for travel.',
                        state: 'counter'
                    }
                ]
            },
            counterOffers: {
                title: 'Counter offers',
                helper: 'Decide when to accept a lower rate or reply with Sokti’s safety script.',
                actions: {
                    accept: 'Accept counter',
                    respond: 'Message client'
                },
                items: [
                    {
                        id: 'co-1',
                        client: 'BRAC NGO Desk',
                        offer: '৳4,000',
                        ask: '৳4,500',
                        note: 'Travel allowance requested for staff meet-up.'
                    },
                    {
                        id: 'co-2',
                        client: 'Raisa Alam',
                        offer: '৳1,500',
                        ask: '৳1,800',
                        note: 'Weekly babysitting bundle with homework help.'
                    }
                ]
            },
            returning: {
                title: 'Returning customers',
                helper: 'Keep high-trust buyers engaged with Sokti nudges and safe payouts.',
                items: [
                    { name: 'Mitu Rahman', gigs: '4 bookings', rating: '5.0 rating', hours: 'Prefers evenings 6–9 PM' },
                    { name: 'Sami Rahman', gigs: '3 gigs', rating: '4.8 rating', hours: 'Fri pickups only' },
                    { name: 'BRAC NGO Desk', gigs: '2 events', rating: 'Agency verified', hours: 'Needs 2 weeks notice' }
                ]
            },
            sidebar: {
                title: 'Workspace shortcuts',
                helper: 'Pin the Sokti tools you use daily.',
                actions: {
                    create: 'Draft a new gig with Sokti templates.',
                    wallet: 'Check instant payouts and balance.',
                    chat: 'Jump back into masked conversations.'
                },
                menuTitle: 'Workspace menu',
                menu: [
                    { key: 'overview', label: 'Overview board', hint: 'Stats & gig health', to: '/p/dashboard' },
                    { key: 'gigs', label: 'Manage gigs', hint: 'Edit packages & pricing', to: '/p/gig/new' },
                    { key: 'wallet', label: 'Wallet & payouts', hint: 'Instant withdraw simulation', to: '/wallet' },
                    { key: 'chat', label: 'Masked chat', hint: 'Keep negotiations safe', to: '/chat' }
                ],
                support: {
                    title: 'Need help?',
                    body: 'Women-led support replies within minutes.',
                    action: 'Ping support'
                }
            }
        },
        gigCreator: {
            title: 'Create gig',
            helper: 'Draft faster with AI suggestions tied to your skills.',
            publishSuccess: 'Gig draft saved locally.'
        },
        clientDashboard: {
            title: 'Client dashboard',
            newRequest: 'New request',
            listTitle: 'Open requests',
            empty: 'No requests have been posted yet.',
            spendSummary: {
                title: 'Spend & bids',
                helper: 'Track payouts, bids, and how Sathi helps match providers.',
                items: [
                    { label: 'This month', value: '৳7,200', helper: '3 gigs confirmed via Sathi briefs.' },
                    { label: 'Lifetime spend', value: '৳32,450', helper: '11 instant payouts since pilot.' },
                    { label: 'Active bids', value: '3 counter offers', helper: 'Sokti is nudging providers before you hire.' }
                ]
            },
            aiSearch: {
                title: 'Ask Sathi to find help',
                body: 'Describe a task in Bangla and Sathi drafts the request, suggests categories, and keeps safety hints visible.',
                helper: 'AI stays optional; masked chat opens only after you confirm.',
                cta: 'Open AI search'
            },
            jobPosts: {
                title: 'Job posts & bids',
                helper: 'Tap a card to view the brief, counter offer, or message the provider.',
                actions: { view: 'View brief', chat: 'Message provider', counter: 'Send counter offer' },
                items: [
                    {
                        id: 'post-1',
                        title: 'After-school tutor for Class 6',
                        status: 'Reviewing offers',
                        budget: '৳4,500 / month',
                        hours: 'Mon–Thu • 3 hrs',
                        provider: 'Nusaiba Khan',
                        review: '4.8 rating',
                        state: 'negotiating',
                        note: 'Waiting on provider availability.'
                    },
                    {
                        id: 'post-2',
                        title: 'Event-day catering support',
                        status: 'Booked',
                        budget: '৳12,000 fixed',
                        hours: 'One day • 8 hrs',
                        provider: 'Shila’s Kitchen',
                        review: '35 reviews',
                        state: 'booked',
                        note: 'Chat open for final menu edits.'
                    },
                    {
                        id: 'post-3',
                        title: 'Data entry for NGO survey',
                        status: 'Counter offer received',
                        budget: '৳6,500 project',
                        hours: 'Remote • 10 hrs',
                        provider: 'Ananya Rahman',
                        review: 'New on SkillSathi',
                        state: 'counter',
                        note: 'Provider asked for ৳7,000 citing volume.'
                    }
                ]
            },
            providerInsights: {
                title: 'Providers you follow',
                helper: 'Sathi saves trusted profiles with reviews, hours, and Sokti safety signals.',
                items: [
                    {
                        name: 'Runa Akter',
                        rating: '4.9 rating',
                        reviews: '32 reviews',
                        hours: 'Fri–Sat • 10am–9pm',
                        note: 'Precision tailoring & Sokti mentor track.'
                    },
                    {
                        name: 'Afia Chowdhury',
                        rating: '4.7 rating',
                        reviews: '18 reviews',
                        hours: 'Daily • remote',
                        note: 'Data entry + transcription with AI assist.'
                    }
                ]
            },
            activeChats: {
                title: 'Active chats & payouts',
                helper: 'Masked conversations stay open until you close the gig.',
                items: [
                    { provider: 'Runa Akter', gig: 'Boutique tailoring', status: 'Awaiting counter', action: 'Open chat' },
                    { provider: 'Afia Chowdhury', gig: 'Data entry pilot', status: 'Ready to pay', action: 'Review wallet' }
                ]
            }
        },
        buyerRequest: {
            title: 'Describe your need',
            helper: 'Use voice or typing anytime.',
            confirmTitle: 'Ready to post this request?',
            confirmBody: 'This demo keeps your text locally on this device.',
            confirmAction: 'Confirm request'
        },
        wallet: {
            title: 'Wallet',
            balance: 'Available balance',
            withdraw: 'Withdraw',
            historyTitle: 'History',
            empty: 'No transactions yet.',
            withdrawSuccess: 'Withdrawal request recorded (demo only).',
            withdrawError: 'Insufficient balance.'
        },
        chat: {
            title: 'Safe chat',
            composerPlaceholder: 'Type your message…',
            panic: 'Panic',
            panicConfirmTitle: 'Block and report this chat?',
            panicConfirmBody: 'We will stop the thread and alert moderators.',
            panicConfirm: 'Block & report',
            warning: 'Phones and emails stay hidden.',
            detection: 'Phone/email detected. Review before sending.',
            sampleUser: 'Hi! I need a tailor for boutique pieces.',
            sampleProvider: 'Hello! I am Runa, can deliver within the same day.',
            maskedHint: 'Contact details remain masked on this platform.'
        },
        walletBanner: 'Phone numbers remain masked.',
        comingSoon: 'This part is under construction.'
    }
};
export default en;
