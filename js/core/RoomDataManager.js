// Room data management system
class RoomDataManager {
    constructor() {
        this.rooms = this.loadRoomData();
        this.init();
    }

    init() {
        // Initialize room data if not exists
        if (Object.keys(this.rooms).length === 0) {
            this.initializeDefaultRoomData();
        }
    }

    loadRoomData() {
        return JSON.parse(localStorage.getItem('roomData') || '{}');
    }

    saveRoomData() {
        localStorage.setItem('roomData', JSON.stringify(this.rooms));
    }

    initializeDefaultRoomData() {
        const defaultRooms = {
            // Second Floor Rooms
            'IT_HALL': {
                name: 'IT Hall',
                capacity: 150,
                type: 'Lecture Hall',
                floor: 'Second Floor',
                description: 'Main IT lecture hall with modern equipment and state-of-the-art technology for computer science courses.',
                amenities: ['Projector', 'Air Conditioning', 'WiFi', 'Whiteboard', 'Sound System'],
                image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'TERRY_&_LINDA_BYRD_HALL': {
                name: 'Terry & Linda Byrd Hall',
                capacity: 200,
                type: 'Conference Hall',
                floor: 'Second Floor',
                description: 'Large conference hall for events, seminars, and major university gatherings.',
                amenities: ['Sound System', 'Projector', 'Air Conditioning', 'Stage', 'Microphones'],
                image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'COMPUTER_LAB': {
                name: 'Computer Lab',
                capacity: 50,
                type: 'Laboratory',
                floor: 'Second Floor',
                description: 'Computer laboratory equipped with latest hardware and software for practical sessions.',
                amenities: ['Computers', 'Internet', 'Printer', 'Air Conditioning', 'Projector'],
                image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'CISCO_LAB': {
                name: 'Cisco Lab',
                capacity: 30,
                type: 'Laboratory',
                floor: 'Second Floor',
                description: 'Specialized networking laboratory with Cisco equipment for network administration courses.',
                amenities: ['Cisco Equipment', 'Network Simulators', 'Projector', 'Workstations'],
                image: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'B.S._CHUMBOW_HALL': {
                name: 'B.S. Chumbow Hall',
                capacity: 100,
                type: 'Lecture Hall',
                floor: 'Second Floor',
                description: 'Medium-sized lecture hall suitable for various academic presentations and classes.',
                amenities: ['Projector', 'Whiteboard', 'Air Conditioning', 'Sound System'],
                image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'RESTROOMS': {
                name: 'Restrooms',
                capacity: 10,
                type: 'Facility',
                floor: 'Second Floor',
                description: 'Public restroom facilities with modern amenities.',
                amenities: ['Running Water', 'Hand Dryers', 'Accessibility Features'],
                image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'STAIRS_TO_FIRST_FLOOR': {
                name: 'Stairs to First Floor',
                capacity: 20,
                type: 'Navigation',
                floor: 'Second Floor',
                description: 'Stairway connecting to first floor with emergency exit access.',
                amenities: ['Emergency Exit', 'Handrails', 'Emergency Lighting'],
                image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'STAIRS_TO_THIRD_FLOOR': {
                name: 'Stairs to Third Floor',
                capacity: 20,
                type: 'Navigation',
                floor: 'Second Floor',
                description: 'Stairway connecting to third floor with safety features.',
                amenities: ['Emergency Exit', 'Handrails', 'Emergency Lighting'],
                image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },

            // Fourth Floor Rooms (Orange Theme)
            'VICE-CHANCELLORS_OFFICE': {
                name: "Vice-Chancellor's Office",
                capacity: 15,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Executive office of the Vice-Chancellor with meeting area and private facilities.',
                amenities: ['Conference Table', 'Private Bathroom', 'Secretary Area', 'Executive Furniture'],
                image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'PA_TO_THE_VC': {
                name: 'P.A. to the VC',
                capacity: 8,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Personal Assistant office providing administrative support to the Vice-Chancellor.',
                amenities: ['Computer Workstation', 'Filing System', 'Phone System', 'Reception Area'],
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'ADMINISTRATIVE_ASSISTANT': {
                name: 'Administrative Assistant',
                capacity: 10,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Administrative support office for various university operations and student services.',
                amenities: ['Workstations', 'Computers', 'Printer', 'Filing Cabinets', 'Service Counter'],
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'CONFERENCE_HALL': {
                name: 'Conference Hall Central',
                capacity: 100,
                type: 'Conference Room',
                floor: 'Fourth Floor',
                description: 'Main conference room for high-level meetings, board meetings, and important university events.',
                amenities: ['Conference Table', 'Projector', 'Video Conferencing', 'Sound System', 'Climate Control'],
                image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'DIR_OF_MARKETING': {
                name: 'Director of Marketing',
                capacity: 12,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Marketing department office responsible for university promotion and public relations.',
                amenities: ['Meeting Table', 'Computers', 'Design Software', 'Presentation Equipment'],
                image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'DEPUTY_VICE-CHANCELLOR': {
                name: 'Deputy Vice-Chancellor',
                capacity: 10,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Office of the Deputy Vice-Chancellor for academic affairs and administration.',
                amenities: ['Executive Desk', 'Meeting Area', 'Bookshelf', 'Computer System'],
                image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'FINANCE_OFFICE': {
                name: 'Finance Office',
                capacity: 25,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Financial administration office handling university finances and accounting.',
                amenities: ['Computers', 'Safe', 'Filing Cabinets', 'Accounting Software', 'Service Counter'],
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'BURSARY': {
                name: 'Bursary',
                capacity: 20,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Student financial services office for tuition payments and financial aid.',
                amenities: ['Service Counter', 'Computers', 'Waiting Area', 'Payment Systems'],
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'QUALITY_CONTROL': {
                name: 'Quality Control',
                capacity: 15,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Quality assurance office ensuring academic standards and institutional excellence.',
                amenities: ['Workstations', 'Document Storage', 'Review Area', 'Computer Systems'],
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'STORE-ROOM': {
                name: 'Store Room',
                capacity: 5,
                type: 'Storage',
                floor: 'Fourth Floor',
                description: 'Storage facility for office supplies and equipment.',
                amenities: ['Shelving', 'Inventory System', 'Climate Control'],
                image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'TRANSCRIPT_OFFICE': {
                name: 'Transcript Office',
                capacity: 12,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Student records office for transcript requests and academic documentation.',
                amenities: ['Service Counter', 'Filing System', 'Computer Database', 'Waiting Area'],
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'PA_TO_THE_RECTOR_RECTOR': {
                name: 'PA to the Rector',
                capacity: 8,
                type: 'Administrative',
                floor: 'Fourth Floor',
                description: 'Personal Assistant office supporting the Rector with administrative duties.',
                amenities: ['Workstation', 'Phone System', 'Filing Cabinet', 'Reception Area'],
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'Stairs_Up': {
                name: 'Stairs Up',
                capacity: 20,
                type: 'Navigation',
                floor: 'Fourth Floor',
                description: 'Stairway leading to upper floors with safety features.',
                amenities: ['Emergency Exit', 'Handrails', 'Emergency Lighting'],
                image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'Stairs_Down': {
                name: 'Stairs Down',
                capacity: 20,
                type: 'Navigation',
                floor: 'Fourth Floor',
                description: 'Stairway leading to lower floors with safety features.',
                amenities: ['Emergency Exit', 'Handrails', 'Emergency Lighting'],
                image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'FOURTH_Floor': {
                name: 'Fourth Floor Central Area',
                capacity: 30,
                type: 'Common Area',
                floor: 'Fourth Floor',
                description: 'Central area of the fourth floor with seating and information displays.',
                amenities: ['Seating Area', 'Information Board', 'WiFi Access'],
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },

            // Basement Rooms
            'Cantine': {
                name: 'Cantine',
                capacity: 80,
                type: 'Dining',
                floor: 'Basement',
                description: 'Student dining facility with various food options and seating areas.',
                amenities: ['Tables', 'Chairs', 'Food Service', 'Refrigeration', 'Kitchen Equipment'],
                image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'Pondi_Hall': {
                name: 'Pondi Hall',
                capacity: 120,
                type: 'Lecture Hall',
                floor: 'Basement',
                description: 'Underground lecture hall with modern audio-visual equipment.',
                amenities: ['Projector', 'Air Conditioning', 'Sound System', 'Tiered Seating'],
                image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'Lounge': {
                name: 'Lounge',
                capacity: 60,
                type: 'Common Area',
                floor: 'Basement',
                description: 'Student relaxation and study area with comfortable seating.',
                amenities: ['Comfortable Seating', 'WiFi', 'Study Tables', 'Vending Machines'],
                image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'Basement_Stairs_up': {
                name: 'Basement Stairs Up',
                capacity: 20,
                type: 'Navigation',
                floor: 'Basement',
                description: 'Stairway connecting basement to ground floor.',
                amenities: ['Emergency Exit', 'Handrails', 'Emergency Lighting'],
                image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'Basement_Stairs_down': {
                name: 'Basement Stairs Down',
                capacity: 20,
                type: 'Navigation',
                floor: 'Basement',
                description: 'Stairway for basement access with safety features.',
                amenities: ['Emergency Exit', 'Handrails', 'Emergency Lighting'],
                image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            },
            'Basement': {
                name: 'Basement Storage',
                capacity: 10,
                type: 'Storage',
                floor: 'Basement',
                description: 'General storage area for university equipment and supplies.',
                amenities: ['Storage Racks', 'Climate Control', 'Security System'],
                image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
            }
        };

        this.rooms = defaultRooms;
        this.saveRoomData();
    }

    getRoomInfo(roomId) {
        return this.rooms[roomId] || {
            name: roomId.replace(/_/g, ' '),
            capacity: 0,
            type: 'Unknown',
            floor: 'Unknown',
            description: 'No description available',
            amenities: [],
            image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
        };
    }

    updateRoom(roomId, roomData) {
        this.rooms[roomId] = { ...this.rooms[roomId], ...roomData };
        this.saveRoomData();
    }

    getAllRooms() {
        return this.rooms;
    }

    searchRooms(query) {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        for (const [id, room] of Object.entries(this.rooms)) {
            if (room.name.toLowerCase().includes(searchTerm) ||
                room.type.toLowerCase().includes(searchTerm) ||
                room.description.toLowerCase().includes(searchTerm)) {
                results.push({ id, ...room });
            }
        }
        
        return results;
    }

    getRoomsByFloor(floor) {
        const floorRooms = {};
        for (const [id, room] of Object.entries(this.rooms)) {
            if (room.floor === floor) {
                floorRooms[id] = room;
            }
        }
        return floorRooms;
    }
}