// import React from 'react';
const organizers = [
    {
        group: "Core Committee",
        members: [
            { name: "Shiv Swapnil", position: "SHRISTI Secy.", image: "SHRISTI_w_border.png" },
            { name: "Tatling Tayeng", position: "Organising Secy.", image: "SHRISTI_w_border.png" },
            { name: "Kesenmo Kath", position: "Asst. SHRISTI Secy.", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Organizing Team",
        members: [
            { name: "Kedarnath Tiwari", position: "Joint Organising Secy.", image: "SHRISTI_w_border.png" },
            { name: "Debarsish Gogoi", position: "Joint Organising Secy.", image: "SHRISTI_w_border.png" },
            { name: "Nabo Aier", position: "Joint Organising Secy.", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Creative Team",
        members: [
            {
                name: "Ainam Nobeng",
                position: "Graphics Designer & Creative Head",
                image: "SHRISTI_w_border.png",
            },
            {
                name: "Chasam Wangsu",
                position: "Graphics Designer & Creative Head",
                image: "SHRISTI_w_border.png",
            },
        ],
    },
    {
        group: "Publicity & Information",
        members: [
            { name: "Triluk Sharma", position: "Info. & Pub. Secy.", image: "SHRISTI_w_border.png" },
            { name: "Swaraj Sharma", position: "Publicity & Branding", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Girls Representation",
        members: [{ name: "Tamashree Das", position: "Girls Representative", image: "SHRISTI_w_border.png" }],
    },
    {
        group: "Website",
        members: [
            { name: "Parthapratim Deuri", position: "Website I/C", image: "SHRISTI_w_border.png" },
            { name: "Robin Debbarma", position: "Website I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "TEDxNERIST Team",
        members: [
            { name: "Kalivi Shohe", position: "TEDxNERIST I/C", image: "SHRISTI_w_border.png" },
            { name: "Anup Das", position: "TEDxNERIST I/C", image: "SHRISTI_w_border.png" },
            { name: "Darba Hangma Subba", position: "TEDxNERIST I/C", image: "SHRISTI_w_border.png" },
            { name: "Uddipan Bhattacharjee", position: "TEDxNERIST I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Event Management",
        members: [
            { name: "Raju Kumar", position: "Event I/C", image: "SHRISTI_w_border.png" },
            { name: "Piyush Patel", position: "Event I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Hospitality",
        members: [
            { name: "Jessica Kamei", position: "Hospitality I/C", image: "SHRISTI_w_border.png" },
            { name: "Lanngambi Thounaojam", position: "Hospitality I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "MUN",
        members: [
            { name: "Arsis Sarma", position: "MUN Secy. General", image: "SHRISTI_w_border.png" },
            { name: "Bhaswati Bora", position: "MUN Secy. I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Volunteers",
        members: [
            { name: "Elsanadia F Pala", position: "Chief Volunteer", image: "SHRISTI_w_border.png" },
            { name: "Aditya Sameer", position: "Chief Volunteer", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Sponsorship",
        members: [
            { name: "Tagru Tapung", position: "Sponsor I/C", image: "SHRISTI_w_border.png" },
            { name: "Huto Milli", position: "Sponsor I/C", image: "SHRISTI_w_border.png" },
            { name: "Vijay Blange", position: "Sponsor I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Techno Club",
        members: [
            { name: "Ashish Ranjan Rahi", position: "Techno I/C", image: "SHRISTI_w_border.png" },
            { name: "Jyoti Kumari Sah", position: "Techno I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Agricultural Department",
        members: [
            { name: "Liagi Moda", position: "Agricultural I/C", image: "SHRISTI_w_border.png" },
            { name: "Diwachu Kath", position: "Agricultural I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Civil Department",
        members: [{ name: "Joydeep Kakoti", position: "Civil I/C", image: "SHRISTI_w_border.png" }],
    },
    {
        group: "Computer Science Department",
        members: [{ name: "Shubham Mishra", position: "Computer Science I/C", image: "SHRISTI_w_border.png" }],
    },
    {
        group: "Electrical Department",
        members: [
            { name: "Babul Kumar Gupta", position: "Electrical I/C", image: "SHRISTI_w_border.png" },
            {
                name: "Ibansiewdorshisha L. Lyngkhoi",
                position: "Electrical I/C",
                image: "SHRISTI_w_border.png",
            },
        ],
    },
    {
        group: "Electronics Department",
        members: [
            { name: "Kumar Aryan", position: "ECE I/C", image: "SHRISTI_w_border.png" },
            { name: "Saptasikha Das", position: "ECE I/C", image: "SHRISTI_w_border.png" },
            { name: "Mina Nath", position: "ECE I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Forestry Department",
        members: [
            { name: "Pratik Pratim Bhardwaj", position: "Forestry I/C", image: "SHRISTI_w_border.png" },
            { name: "Alina Lalnunfeli", position: "Forestry I/C", image: "SHRISTI_w_border.png" },
            { name: "Viu Metha", position: "Forestry I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "Mechanical Department",
        members: [
            { name: "Chow Supungyam Manlong", position: "Mechanical I/C", image: "SHRISTI_w_border.png" },
            { name: "Sourav Kumar", position: "Mechanical I/C", image: "SHRISTI_w_border.png" },
        ],
    },
    {
        group: "MBA Department",
        members: [
            { name: "Soma Barman", position: "MBA I/C", image: "SHRISTI_w_border.png" },
            { name: "Kana Tagru", position: "MBA I/C", image: "SHRISTI_w_border.png" },
        ],
    },
];

const Organizers = () => {
    return (
        <div className="pt-16 transition-all duration-300 ease-in-out">
            <div className="pt-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex items-center justify-center">
                <div className="max-w-6xl mx-auto text-center">
                    <header className="mb-12">
                        <h1 className="text-5xl font-bold text-yellow-500 mb-4">
                            Meet the Organizers
                        </h1>
                        <p className="text-lg text-gray-300">
                            The driving force behind Shristi 2k25 – dedicated,
                            passionate, and innovative minds!
                        </p>
                    </header>
                    {organizers.map((group, groupIndex) => (
                        <div key={groupIndex} className="mb-12">
                            <h2 className="text-3xl font-semibold text-purple-400 mb-6 border-b-2 border-gray-600 pb-2">
                                {group.group}
                            </h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                {group.members.map((member, memberIndex) => (
                                    <div
                                        key={memberIndex}
                                        className="bg-gray-700 w-72 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-3/4 mx-auto rounded-full mb-4"
                                        />
                                        <h3 className="text-xl font-medium text-yellow-500 mb-2">
                                            <strong>{member.name}</strong>
                                        </h3>
                                        <p className="text-sm text-gray-300">
                                            <strong>{member.position}</strong>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Organizers;
