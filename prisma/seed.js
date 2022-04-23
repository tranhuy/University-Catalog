const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

(async() => {
    try {
        //Delete all records from tables       
        await prisma.domain.deleteMany({});
        await prisma.website.deleteMany({});
        await prisma.university.deleteMany({});

        console.log('Table records deleted');

        //Reset table auto increment to 1
        await prisma.$queryRaw`ALTER TABLE domain AUTO_INCREMENT = 1`;
        await prisma.$queryRaw`ALTER TABLE university AUTO_INCREMENT = 1`;
        await prisma.$queryRaw`ALTER TABLE website AUTO_INCREMENT = 1`;

        console.log('Auto increment reset to 1');

        //Fetching data from public API
        const { data } = await axios.get('http://universities.hipolabs.com/search');
        
        //Populating database tables with data from API
        await Promise.all(data.map(async university => {
            return {
                record: await prisma.university.create({
                    data: {
                        name: university.name,
                        country: university.country,
                        state_province: university['state-province'],
                        alpha_two_code: university.alpha_two_code,
                        domains: {
                            create: 
                                university.domains.map(domain => ({
                                    domain_name: domain
                                }))                       
                        },
                        websites: {
                            create: 
                                university.web_pages.map(url => ({
                                    url
                                }))
                        }
                    }
                })
            }
        }));

        console.log('Database seeding complete!');      
    } catch (err) {
        console.error(err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();