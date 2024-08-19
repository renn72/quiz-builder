export const testTopics = [
  { name: 'Cardiology' },
  { name: 'Neurology' },
  { name: 'Oncology' },
  { name: 'Pediatrics' },
  { name: 'Orthopedics' },
  { name: 'Dermatology' },
  { name: 'Gastroenterology' },
  { name: 'Psychiatry' },
  { name: 'Radiology' },
  { name: 'Endocrinology' },
]

export const testTags = [
  { name: 'Heart Disease', topicId: 1 },
  { name: 'Hypertension', topicId: 1 },
  { name: 'Stroke', topicId: 2 },
  { name: 'Epilepsy', topicId: 2 },
  { name: 'Breast Cancer', topicId: 3 },
  { name: 'Chemotherapy', topicId: 3 },
  { name: 'Childhood Vaccination', topicId: 4 },
  { name: 'Pediatric Asthma', topicId: 4 },
  { name: 'Joint Replacement', topicId: 5 },
  { name: 'Fracture Treatment', topicId: 5 },
  { name: 'Acne', topicId: 6 },
  { name: 'Psoriasis', topicId: 6 },
  { name: 'Irritable Bowel Syndrome', topicId: 7 },
  { name: 'Liver Disease', topicId: 7 },
  { name: 'Depression', topicId: 8 },
  { name: 'Anxiety Disorders', topicId: 8 },
  { name: 'X-ray Imaging', topicId: 9 },
  { name: 'MRI Scans', topicId: 9 },
  { name: 'Diabetes Management', topicId: 10 },
  { name: 'Thyroid Disorders', topicId: 10 },
]
export const testQuestions = [
  {
    name: 'Gene Therapy Breakthrough',
    case: 'A revolutionary new gene therapy treatment for cystic fibrosis',
    question:
      'What was the primary benefit of the new gene therapy for cystic fibrosis?',
    multipleChoiceOptions: [
      'Improved lung function',
      'Increased life expectancy',
      'Reduction in daily medications',
      'Fewer hospitalizations',
    ],
    topics: [{ id: 4 }, { id: 9 }],
    tags: [{ id: 12 }, { id: 17 }],
  },
  {
    name: 'Meditation and Anxiety Study',
    case: 'A study on the effects of daily meditation on anxiety levels in adults',
    question:
      'What was the most significant reduction observed in participants who meditated daily?',
    multipleChoiceOptions: [
      'Anxiety levels',
      'Heart rate',
      'Blood pressure',
      'Insomnia symptoms',
    ],
    topics: [{ id: 3 }, { id: 6 }, { id: 8 }],
    tags: [{ id: 10 }, { id: 19 }, { id: 5 }],
  },
  {
    name: 'New Cancer Drug Trial',
    case: 'A clinical trial testing a new drug for treating advanced melanoma',
    question:
      'What was the primary outcome of the clinical trial for the new melanoma drug?',
    multipleChoiceOptions: [
      'Increased survival rates',
      'Reduction in tumor size',
      'Fewer side effects',
      'Improved quality of life',
    ],
    topics: [{ id: 1 }, { id: 9 }],
    tags: [{ id: 15 }, { id: 6 }, { id: 18 }],
  },
  {
    name: 'Vaccination Rate Increase',
    case: 'A public health campaign to increase vaccination rates among children',
    question:
      'What was a key strategy used in the campaign to boost vaccination rates?',
    multipleChoiceOptions: [
      'Education programs for parents',
      'Free vaccination clinics',
      'Partnerships with schools',
      'Incentives for healthcare providers',
    ],
    topics: [{ id: 2 }, { id: 5 }],
    tags: [{ id: 4 }, { id: 11 }, { id: 20 }],
  },
  {
    name: 'Telemedicine Expansion',
    case: 'The rapid expansion of telemedicine services during the COVID-19 pandemic',
    question:
      'What was a primary benefit of the increased use of telemedicine?',
    multipleChoiceOptions: [
      'Increased access to care',
      'Reduced healthcare costs',
      'Improved patient satisfaction',
      'Enhanced data security',
    ],
    topics: [{ id: 7 }, { id: 10 }, { id: 3 }],
    tags: [{ id: 8 }, { id: 14 }],
  },
  {
    name: 'Mental Health and Social Media',
    case: 'The impact of social media on the mental health of teenagers',
    question:
      'What was a common negative effect of excessive social media use observed in the study?',
    multipleChoiceOptions: [
      'Increased anxiety',
      'Depression',
      'Sleep disturbances',
      'Lower self-esteem',
    ],
    topics: [{ id: 6 }, { id: 8 }],
    tags: [{ id: 13 }, { id: 2 }],
  },
  {
    name: 'Obesity and Diet Study',
    case: 'A study examining the effects of a high-protein diet on obesity in adults',
    question:
      'What was the most significant finding of the high-protein diet study?',
    multipleChoiceOptions: [
      'Greater weight loss',
      'Improved blood sugar levels',
      'Reduced appetite',
      'Increased muscle mass',
    ],
    topics: [{ id: 1 }, { id: 4 }, { id: 7 }],
    tags: [{ id: 9 }, { id: 17 }, { id: 12 }],
  },
  {
    name: 'AI in Diagnostic Imaging',
    case: 'The introduction of AI to assist in diagnostic imaging for early cancer detection',
    question: 'What was the primary benefit of using AI in diagnostic imaging?',
    multipleChoiceOptions: [
      'Improved accuracy of diagnoses',
      'Faster processing times',
      'Reduced need for biopsies',
      'Lower healthcare costs',
    ],
    topics: [{ id: 3 }, { id: 10 }],
    tags: [{ id: 5 }, { id: 15 }],
  },
  {
    name: 'Sleep Apnea Treatment Innovations',
    case: 'The development of a new, less invasive treatment for sleep apnea',
    question: 'What was a key advantage of the new sleep apnea treatment?',
    multipleChoiceOptions: [
      'Improved patient compliance',
      'Fewer side effects',
      'Better long-term outcomes',
      'Lower cost of treatment',
    ],
    topics: [{ id: 8 }, { id: 1 }],
    tags: [{ id: 20 }, { id: 7 }],
  },
  {
    name: 'Childhood Asthma Management',
    case: 'A new approach to managing asthma in children using digital inhalers',
    question:
      'What was the primary benefit of using digital inhalers in asthma management?',
    multipleChoiceOptions: [
      'Improved adherence to treatment',
      'Better monitoring of symptoms',
      'Reduced hospital visits',
      'Increased patient engagement',
    ],
    topics: [{ id: 6 }, { id: 3 }],
    tags: [{ id: 11 }, { id: 4 }],
  },
  {
    name: 'Diabetes Prevention Program',
    case: 'A community-based program aimed at preventing type 2 diabetes in high-risk populations',
    question:
      'What was the most effective component of the diabetes prevention program?',
    multipleChoiceOptions: [
      'Dietary counseling',
      'Physical activity sessions',
      'Group support meetings',
      'Regular health screenings',
    ],
    topics: [{ id: 9 }, { id: 7 }],
    tags: [{ id: 18 }, { id: 1 }],
  },
  {
    name: 'Chronic Pain Management Study',
    case: 'A study on the effectiveness of non-opioid treatments for chronic pain',
    question:
      'What non-opioid treatment was found to be most effective in managing chronic pain?',
    multipleChoiceOptions: [
      'Physical therapy',
      'Acupuncture',
      'Cognitive-behavioral therapy',
      'Meditation',
    ],
    topics: [{ id: 2 }, { id: 5 }, { id: 10 }],
    tags: [{ id: 3 }, { id: 16 }],
  },
  {
    name: 'Genetic Screening Advancements',
    case: 'Advancements in genetic screening for early detection of hereditary diseases',
    question:
      'What was a major advantage of the new genetic screening techniques?',
    multipleChoiceOptions: [
      'Earlier detection of diseases',
      'Increased accuracy of results',
      'Reduced cost of screening',
      'Broader accessibility',
    ],
    topics: [{ id: 4 }, { id: 1 }],
    tags: [{ id: 14 }, { id: 19 }, { id: 7 }],
  },
  {
    name: 'Pediatric Vaccine Development',
    case: 'The development of a new, more effective pediatric vaccine for meningitis',
    question: 'What was a key benefit of the new pediatric meningitis vaccine?',
    multipleChoiceOptions: [
      'Longer-lasting immunity',
      'Fewer side effects',
      'Simplified dosing schedule',
      'Improved efficacy in infants',
    ],
    topics: [{ id: 7 }, { id: 8 }],
    tags: [{ id: 10 }, { id: 2 }],
  },
  {
    name: 'Stroke Rehabilitation Techniques',
    case: 'Innovative techniques for improving stroke rehabilitation outcomes',
    question:
      'Which technique was most effective in enhancing motor recovery post-stroke?',
    multipleChoiceOptions: [
      'Constraint-induced movement therapy',
      'Virtual reality training',
      'Robotic-assisted therapy',
      'Mirror therapy',
    ],
    topics: [{ id: 3 }, { id: 6 }, { id: 9 }],
    tags: [{ id: 11 }, { id: 5 }],
  },
  {
    name: 'Alzheimer’s Disease Prevention',
    case: 'Research on lifestyle factors that may prevent Alzheimer’s disease',
    question:
      'Which lifestyle change was most strongly associated with a reduced risk of Alzheimer’s?',
    multipleChoiceOptions: [
      'Regular physical exercise',
      'Mediterranean diet',
      'Mental stimulation activities',
      'Social engagement',
    ],
    topics: [{ id: 10 }, { id: 4 }],
    tags: [{ id: 15 }, { id: 18 }],
  },
  {
    name: 'Artificial Organs Development',
    case: 'The development of bioengineered organs for transplant patients',
    question:
      'What is a key advantage of bioengineered organs over traditional transplants?',
    multipleChoiceOptions: [
      'Reduced risk of rejection',
      'Shorter recovery time',
      'Lower cost of production',
      'Wider availability',
    ],
    topics: [{ id: 8 }, { id: 5 }],
    tags: [{ id: 12 }, { id: 9 }],
  },
  {
    name: 'Cancer Immunotherapy Advances',
    case: 'Recent advances in immunotherapy for treating metastatic cancers',
    question: 'What was a major breakthrough in cancer immunotherapy?',
    multipleChoiceOptions: [
      'Personalized vaccines',
      'Checkpoint inhibitors',
      'CAR-T cell therapy',
      'Adoptive cell transfer',
    ],
    topics: [{ id: 7 }, { id: 3 }, { id: 9 }],
    tags: [{ id: 16 }, { id: 11 }],
  },
  {
    name: 'Global Malaria Eradication',
    case: 'A new initiative aimed at eradicating malaria worldwide by 2050',
    question:
      'What strategy is central to the global malaria eradication initiative?',
    multipleChoiceOptions: [
      'Mass drug administration',
      'Widespread use of bed nets',
      'Development of a malaria vaccine',
      'Vector control through insecticides',
    ],
    topics: [{ id: 1 }, { id: 4 }],
    tags: [{ id: 7 }, { id: 18 }],
  },
  {
    name: 'Obesity-Related Liver Disease',
    case: 'A study linking obesity to the rise in non-alcoholic fatty liver disease (NAFLD)',
    question:
      'What is a recommended treatment approach for patients with NAFLD?',
    multipleChoiceOptions: [
      'Weight loss through diet and exercise',
      'Bariatric surgery',
      'Medication for insulin resistance',
      'Liver transplant in severe cases',
    ],
    topics: [{ id: 6 }, { id: 2 }],
    tags: [{ id: 15 }, { id: 3 }],
  },
  {
    name: 'Antibiotic Resistance Crisis',
    case: 'The growing threat of antibiotic resistance and its global implications',
    question: 'What is a key factor contributing to antibiotic resistance?',
    multipleChoiceOptions: [
      'Overprescription of antibiotics',
      'Poor hygiene practices',
      'Lack of new antibiotics development',
      'Global travel and trade',
    ],
    topics: [{ id: 10 }, { id: 5 }],
    tags: [{ id: 9 }, { id: 17 }, { id: 20 }],
  },
  {
    name: 'Mental Health in the Workplace',
    case: 'A study on the impact of workplace stress on employee mental health',
    question:
      'What was found to be the most effective strategy for reducing workplace stress?',
    multipleChoiceOptions: [
      'Flexible work hours',
      'Employee wellness programs',
      'Mental health days',
      'Improved management communication',
    ],
    topics: [{ id: 3 }, { id: 8 }],
    tags: [{ id: 14 }, { id: 4 }],
  },
  {
    name: 'Pediatric Nutrition Guidelines',
    case: 'New guidelines for pediatric nutrition to combat childhood obesity',
    question:
      'What dietary change is most emphasized in the new pediatric nutrition guidelines?',
    multipleChoiceOptions: [
      'Increased intake of fruits and vegetables',
      'Reduction of sugar-sweetened beverages',
      'Promotion of whole grains',
      'Encouragement of home-cooked meals',
    ],
    topics: [{ id: 1 }, { id: 7 }],
    tags: [{ id: 11 }, { id: 5 }],
  },
  {
    name: 'Post-Surgical Recovery Innovations',
    case: 'Innovative approaches to enhancing post-surgical recovery times',
    question:
      'Which method was found to significantly reduce recovery time after surgery?',
    multipleChoiceOptions: [
      'Enhanced recovery after surgery (ERAS) protocols',
      'Minimally invasive surgical techniques',
      'Prehabilitation programs',
      'Use of surgical robots',
    ],
    topics: [{ id: 6 }, { id: 2 }, { id: 9 }],
    tags: [{ id: 16 }, { id: 8 }],
  },
  {
    name: 'Health Benefits of Plant-Based Diets',
    case: 'A comprehensive review of the health benefits associated with plant-based diets',
    question:
      'What is a significant health benefit linked to plant-based diets?',
    multipleChoiceOptions: [
      'Lower risk of heart disease',
      'Improved digestion',
      'Better skin health',
      'Increased energy levels',
    ],
    topics: [{ id: 5 }, { id: 10 }],
    tags: [{ id: 13 }, { id: 2 }],
  },
  {
    name: 'Global Vaccination Strategy',
    case: 'A new global strategy to improve vaccination rates in developing countries',
    question:
      'What was identified as a key barrier to vaccination in developing countries?',
    multipleChoiceOptions: [
      'Vaccine misinformation',
      'Lack of healthcare infrastructure',
      'Cultural beliefs',
      'Supply chain issues',
    ],
    topics: [{ id: 4 }, { id: 1 }],
    tags: [{ id: 12 }, { id: 18 }],
  },
  {
    name: 'Health Monitoring Wearables',
    case: 'The rise of wearable technology for continuous health monitoring',
    question:
      'What health metric is most commonly tracked by wearable devices?',
    multipleChoiceOptions: [
      'Heart rate',
      'Steps taken',
      'Calories burned',
      'Sleep quality',
    ],
    topics: [{ id: 3 }, { id: 7 }],
    tags: [{ id: 14 }, { id: 10 }],
  },
  {
    name: 'Asthma Treatment Advancements',
    case: 'Advancements in inhaler technology for better asthma management',
    question: 'What is a key feature of the latest asthma inhalers?',
    multipleChoiceOptions: [
      'Integrated dose counters',
      'Faster delivery of medication',
      'Lower dosage requirements',
      'Smartphone connectivity',
    ],
    topics: [{ id: 8 }, { id: 6 }, { id: 2 }],
    tags: [{ id: 5 }, { id: 11 }],
  },
  {
    name: 'Geriatric Care Innovations',
    case: 'Innovations in geriatric care to improve quality of life for the elderly',
    question:
      'What was found to be the most effective in enhancing the quality of life in elderly patients?',
    multipleChoiceOptions: [
      'Regular physical activity',
      'Social engagement programs',
      'Personalized care plans',
      'Nutritional support',
    ],
    topics: [{ id: 7 }, { id: 4 }],
    tags: [{ id: 9 }, { id: 13 }],
  },
  {
    name: 'Mental Health First Aid Training',
    case: 'The implementation of mental health first aid training in workplaces',
    question:
      'What was a primary outcome of introducing mental health first aid training?',
    multipleChoiceOptions: [
      'Increased awareness of mental health issues',
      'Reduced stigma around mental health',
      'Better support for colleagues in distress',
      'Lower incidence of mental health crises',
    ],
    topics: [{ id: 1 }, { id: 5 }],
    tags: [{ id: 7 }, { id: 16 }],
  },
  {
    name: 'Nutrition and Cognitive Function',
    case: 'Research on the impact of nutrition on cognitive function in older adults',
    question:
      'Which nutrient was most strongly linked to improved cognitive function?',
    multipleChoiceOptions: [
      'Omega-3 fatty acids',
      'Vitamin D',
      'Antioxidants',
      'B vitamins',
    ],
    topics: [{ id: 3 }, { id: 9 }, { id: 6 }],
    tags: [{ id: 8 }, { id: 15 }],
  },
  {
    name: 'Pediatric Mental Health Services',
    case: 'Expansion of mental health services for children and adolescents',
    question:
      'What was a major challenge in providing pediatric mental health services?',
    multipleChoiceOptions: [
      'Lack of trained professionals',
      'Stigma associated with mental health',
      'Insufficient funding',
      'Limited access to care in rural areas',
    ],
    topics: [{ id: 10 }, { id: 7 }],
    tags: [{ id: 2 }, { id: 14 }],
  },
]
