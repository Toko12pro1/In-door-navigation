// Map controller for handling all map-related functionality
class MapController {
    constructor(roomDataManager, analytics) {
        this.roomDataManager = roomDataManager;
        this.analytics = analytics;
        this.currentFloor = 'second';
        this.viewBox = { x: 0, y: 0, width: 1440, height: 1024 };
        this.isPanning = false;
        this.startPoint = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.loadMapContent();
        this.setupMapInteractivity();
    }

    loadMapContent() {
        const mapContent = `
            <div class="map-content-wrapper">
                <h2>🗺️ ICT University Campus Navigator</h2>
                <div class="map-controls">
                    <div class="control-group">
                        <input id="roomSearch" onkeyup="campusNavigator.mapController.filterRooms()" placeholder="🔍 Search rooms..." 
                               style="margin-bottom: 8px; padding: 12px; font-size: 16px; width: 240px; border: 2px solid #ddd; border-radius: 8px;" type="text"/>
                        <select id="roomSelect" multiple size="6" style="width: 250px; padding: 8px; border: 2px solid #ddd; border-radius: 8px;">
                            ${this.generateRoomOptions()}
                        </select>
                    </div>
                    <div class="control-buttons">
                        <button onclick="campusNavigator.mapController.highlightSelected()" class="btn-animated">
                            <span class="button-icon">🎯</span>Highlight Selected
                        </button>
                        <button onclick="campusNavigator.mapController.resetHighlights()" class="btn-animated">
                            <span class="button-icon">🔄</span>Reset
                        </button>
                        <button onclick="campusNavigator.mapController.showRoomCapacities()" class="btn-animated">
                            <span class="button-icon">👥</span>Show Capacities
                        </button>
                    </div>
                </div>
                <div class="floor-selector">
                    <button onclick="campusNavigator.mapController.showFloor('second')" class="floor-btn active hover-lift" id="floor-second">
                        <span class="button-icon">2️⃣</span>Second Floor
                    </button>
                    <button onclick="campusNavigator.mapController.showFloor('first')" class="floor-btn hover-lift" id="floor-first">
                        <span class="button-icon">1️⃣</span>First Floor
                    </button>
                    <button onclick="campusNavigator.mapController.showFloor('basement')" class="floor-btn hover-lift" id="floor-basement">
                        <span class="button-icon">🏠</span>Basement
                    </button>
                    <button onclick="campusNavigator.mapController.showFloor('fourth')" class="floor-btn hover-lift" id="floor-fourth">
                        <span class="button-icon">4️⃣</span>Fourth Floor
                    </button>
                </div>
                <div id="svgContainer">
                    <div class="zoom-controls">
                        <button onclick="campusNavigator.mapController.zoom(1.2)" class="hover-scale">
                            <span class="button-icon">🔍</span>Zoom In
                        </button>
                        <button onclick="campusNavigator.mapController.zoom(0.8)" class="hover-scale">
                            <span class="button-icon">🔍</span>Zoom Out
                        </button>
                        <button onclick="campusNavigator.mapController.resetZoom()" class="hover-scale">
                            <span class="button-icon">🎯</span>Reset View
                        </button>
                    </div>
                    <div class="zoom-wrapper">
                        ${this.generateMapSVG()}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('map-content').innerHTML = mapContent;
        this.setupMapInteractivity();
    }

    generateRoomOptions() {
        const rooms = this.roomDataManager.getAllRooms();
        return Object.entries(rooms).map(([id, room]) => {
            const typeIcon = this.getRoomTypeIcon(room.type);
            return `<option value="${id}">${typeIcon} ${room.name}</option>`;
        }).join('');
    }

    getRoomTypeIcon(type) {
        const icons = {
            'Lecture Hall': '🏛️',
            'Laboratory': '💻',
            'Conference Room': '🤝',
            'Administrative': '🏢',
            'Facility': '🚻',
            'Navigation': '🪜',
            'Common Area': '🛋️',
            'Dining': '🍽️',
            'Storage': '📦'
        };
        return icons[type] || '🏢';
    }

    generateMapSVG() {
        return `
            <svg fill="none" height="1024" id="zoomSvg" viewBox="0 0 1440 1024" width="1440" xmlns="http://www.w3.org/2000/svg">
                <!-- Second Floor (Default) -->
                <g id="second-floor" class="floor-layer active">
                    <rect fill="white" height="1024" width="1440"></rect>
                    ${this.generateSecondFloorRooms()}
                </g>
                
                <!-- First Floor -->
                <g id="first-floor" class="floor-layer" style="display: none;">
                    <rect fill="#F0F8FF" height="1024" width="1440"></rect>
                    ${this.generateFirstFloorRooms()}
                </g>
                
                <!-- Basement -->
                <g id="basement-floor" class="floor-layer" style="display: none;">
                    <rect fill="#F5F5F5" height="1024" width="1440"></rect>
                    ${this.generateBasementRooms()}
                </g>
                
                <!-- Fourth Floor with Orange Theme -->
                <g id="fourth-floor" class="floor-layer" style="display: none;">
                    <rect fill="white" height="1024" width="1440"></rect>
                    ${this.generateFourthFloorRooms()}
                </g>
            </svg>
        `;
    }

    generateSecondFloorRooms() {
        return `
            <g id="IT_HALL" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="448" width="493" x="0.5" y="0.5"></rect>
                <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="40" font-weight="bold" text-anchor="middle" x="247.0" y="224.5">IT HALL</text>
            </g>
            <g id="TERRY_&_LINDA_BYRD_HALL" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="448" width="469" x="494.5" y="0.5"></rect>
                <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="27" font-weight="bold" text-anchor="middle" x="729.0" y="224.5">TERRY & LINDA BYRD HALL</text>
            </g>
            <g id="COMPUTER_LAB" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="448" width="475" x="964.5" y="0.5"></rect>
                <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="40" font-weight="bold" text-anchor="middle" x="1202.0" y="224.5">COMPUTER LAB</text>
            </g>
            <g id="CISCO_LAB" class="room-clickable hover-lift">
                <rect fill="#FA1616" height="332" width="553" x="886.5" y="691.5"></rect>
                <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="40" font-weight="bold" text-anchor="middle" x="1163.0" y="857.5">CISCO LAB</text>
            </g>
            <g id="RESTROOMS" class="room-clickable hover-lift">
                <rect fill="#141313" height="241" width="166" x="0.5" y="449.5"></rect>
                <text dominant-baseline="central" fill="white" font-family="DejaVu Sans" font-size="21" font-weight="bold" text-anchor="middle" x="83.5" y="570.0">RESTROOMS</text>
            </g>
            <g id="STAIRS_TO_FIRST_FLOOR" class="room-clickable hover-lift">
                <rect fill="black" fill-opacity="0.2" height="269" width="127" x="607.5" y="754.5"></rect>
                <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="9" font-weight="bold" text-anchor="middle" x="682.5" y="889.0">STAIRS TO FIRST FLOOR</text>
            </g>
            <g id="STAIRS_TO_THIRD_FLOOR" class="room-clickable hover-lift">
                <rect fill="#D9D9D9" height="269" stroke="#141313" width="127" x="758.5" y="754.5"></rect>
                <text dominant-baseline="central" fill="black" font-family="DejaVu Sans" font-size="8" font-weight="bold" text-anchor="middle" x="822.0" y="889.0">STAIRS TO THIRD FLOOR</text>
            </g>
        `;
    }

    generateFirstFloorRooms() {
        return `
            <g id="Marketing/PR_Department" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="189" width="269" x="893.5" y="100.5"></rect>
                <text fill="black" font-size="14" text-anchor="middle" x="1028" y="198.0">Marketing/PR Department</text>
            </g>
            <g id="George_M_Mbarika,_Sr" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="185" width="276" x="1163.5" y="100.5"></rect>
                <text fill="black" font-size="12" text-anchor="middle" x="1253" y="189.0">George M. Mbarika, Sr.</text>
            </g>
            <g id="Sick_Bay" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="379" width="584" x="0.5" y="100.5"></rect>
                <text fill="black" font-size="20" text-anchor="middle" x="292" y="298.0">Sick Bay</text>
            </g>
        `;
    }

    generateBasementRooms() {
        return `
            <g id="Cantine" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="480" stroke="#0B0A0A" width="716" x="0.5" y="543.5"></rect>
                <text alignment-baseline="middle" fill="black" font-size="40" text-anchor="middle" x="358" y="776">Cantine</text>
            </g>
            <g id="Pondi_Hall" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="542" stroke="#0B0A0A" width="365" x="0.5" y="0.5"></rect>
                <text alignment-baseline="middle" fill="black" font-size="40" text-anchor="middle" x="183" y="261">Pondi Hall</text>
            </g>
            <g id="Lounge" class="room-clickable hover-lift">
                <rect fill="#FF1515" height="1023" stroke="#0B0A0A" width="414" x="1025.5" y="0.5"></rect>
                <text alignment-baseline="middle" fill="black" font-size="40" text-anchor="middle" x="1232" y="502">Lounge</text>
            </g>
        `;
    }

    generateFourthFloorRooms() {
        return `
            <!-- Vice-Chancellor's Office -->
            <g id="VICE-CHANCELLORS_OFFICE" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="393" stroke="black" width="266" x="0.5" y="0.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" text-anchor="start" x="10" y="30">VICE-CHANCELLOR'S</text>
                <text dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" text-anchor="start" x="10" y="50">OFFICE</text>
            </g>
            
            <!-- P.A. to the VC -->
            <g id="PA_TO_THE_VC" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="194" stroke="black" width="226" x="267.5" y="0.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="11" font-weight="bold" text-anchor="start" x="277" y="30">P.A. TO THE VC</text>
            </g>
            
            <!-- Administrative Assistant -->
            <g id="ADMINISTRATIVE_ASSISTANT" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="198" stroke="black" width="226" x="267.5" y="195.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="10" font-weight="bold" text-anchor="start" x="277" y="225">ADMINISTRATIVE</text>
                <text dominant-baseline="middle" fill="white" font-size="10" font-weight="bold" text-anchor="start" x="277" y="245">ASSISTANT</text>
            </g>
            
            <!-- Conference Hall Central -->
            <g id="CONFERENCE_HALL" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="194" stroke="black" width="537" x="494.5" y="0.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="14" font-weight="bold" text-anchor="start" x="504" y="30">CONFERENCE HALL</text>
                <text dominant-baseline="middle" fill="white" font-size="14" font-weight="bold" text-anchor="start" x="504" y="50">CENTRAL</text>
            </g>
            
            <!-- Director of Marketing -->
            <g id="DIR_OF_MARKETING" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="194" stroke="black" width="256" x="1032.5" y="0.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="11" font-weight="bold" text-anchor="start" x="1042" y="30">DIR. OF MARKETING</text>
            </g>
            
            <!-- Deputy Vice-Chancellor -->
            <g id="DEPUTY_VICE-CHANCELLOR" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="393" stroke="black" width="150" x="1289.5" y="0.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="9" font-weight="bold" text-anchor="start" x="1299" y="25">DEPUTY</text>
                <text dominant-baseline="middle" fill="white" font-size="9" font-weight="bold" text-anchor="start" x="1299" y="40">VICE-CHANCELLOR</text>
            </g>
            
            <!-- Restrooms -->
            <g id="RESTROOMS_FOURTH" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="235" stroke="black" width="162" x="0.5" y="394.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" text-anchor="start" x="10" y="424">RESTROOMS</text>
            </g>
            
            <!-- Fourth Floor Central Area -->
            <g id="FOURTH_Floor" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="124" stroke="black" width="300" x="613" y="450"></rect>
                <text dominant-baseline="middle" fill="white" font-size="14" font-weight="bold" text-anchor="start" x="623" y="480">FOURTH FLOOR</text>
                <text dominant-baseline="middle" fill="white" font-size="14" font-weight="bold" text-anchor="start" x="623" y="500">CENTRAL AREA</text>
            </g>
            
            <!-- Store Room -->
            <g id="STORE-ROOM" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="203" stroke="black" width="266" x="0.5" y="628.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" text-anchor="start" x="10" y="658">STORE-ROOM</text>
            </g>
            
            <!-- Transcript Office -->
            <g id="TRANSCRIPT_OFFICE" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="191" stroke="black" width="266" x="0.5" y="832.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="11" font-weight="bold" text-anchor="start" x="10" y="862">TRANSCRIPT OFFICE</text>
            </g>
            
            <!-- PA to the Rector -->
            <g id="PA_TO_THE_RECTOR_RECTOR" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="189" stroke="black" width="199" x="394.5" y="642.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="10" font-weight="bold" text-anchor="start" x="404" y="672">PA TO THE RECTOR</text>
            </g>
            
            <!-- Stairs Up -->
            <g id="Stairs_Up" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="191.0" stroke="black" stroke-width="1" width="199.0" x="394.5" y="832.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" text-anchor="middle" x="494.0" y="928.0">Stairs Up</text>
            </g>
            
            <!-- Stairs Down -->
            <g id="Stairs_Down" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="256.0" stroke="black" stroke-width="1" width="129.0" x="594.5" y="767.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="11" font-weight="bold" text-anchor="middle" x="659.0" y="895.5">Stairs Down</text>
            </g>
            
            <!-- Finance Office -->
            <g id="FINANCE_OFFICE" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="193" stroke="black" width="230" x="889.5" y="642.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" text-anchor="start" x="899" y="654">FINANCE OFFICE</text>
            </g>
            
            <!-- Bursary -->
            <g id="BURSARY" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="187" stroke="black" width="230" x="889.5" y="836.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" text-anchor="start" x="899" y="866">BURSARY</text>
            </g>
            
            <!-- Quality Control -->
            <g id="QUALITY_CONTROL" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="395" stroke="black" width="319" x="1120.5" y="628.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" text-anchor="start" x="1130" y="658">QUALITY CONTROL</text>
            </g>
            
            <!-- Unnamed Room 4 -->
            <g id="Unnamed_Room_4" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="198.0" stroke="black" stroke-width="1" width="256.0" x="1032.5" y="195.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="11" font-weight="bold" text-anchor="middle" x="1160.5" y="294.5">Unnamed Room 4</text>
            </g>
            
            <!-- Unnamed Room 3 -->
            <g id="Unnamed_Room_3" class="room-clickable hover-lift">
                <rect fill="#FF8C00" height="256.0" stroke="black" stroke-width="1" width="138.0" x="750.5" y="767.5"></rect>
                <text dominant-baseline="middle" fill="white" font-size="10" font-weight="bold" text-anchor="middle" x="819.5" y="895.5">Unnamed Room 3</text>
            </g>
        `;
    }

    setupMapInteractivity() {
        setTimeout(() => {
            this.initializeMapFunctions();
            this.setupRoomClickHandlers();
        }, 100);
    }

    setupRoomClickHandlers() {
        document.querySelectorAll('.room-clickable').forEach(room => {
            room.addEventListener('click', (e) => {
                e.stopPropagation();
                const roomId = room.id;
                const rect = room.getBoundingClientRect();
                const position = {
                    x: rect.right,
                    y: rect.top + (rect.height / 2)
                };
                
                if (window.campusNavigator?.roomInfoPanel) {
                    window.campusNavigator.roomInfoPanel.show(roomId, position);
                }
                
                this.analytics.trackEvent('room_click', `Clicked on room: ${roomId}`, { roomId });
            });

            room.addEventListener('mouseenter', () => {
                room.classList.add('hovered');
            });

            room.addEventListener('mouseleave', () => {
                room.classList.remove('hovered');
            });
        });
    }

    initializeMapFunctions() {
        const svg = document.getElementById("zoomSvg");
        if (!svg) return;

        this.setupZoomAndPan(svg);
        this.updateViewBox();
    }

    setupZoomAndPan(svg) {
        svg.addEventListener("mousedown", (e) => {
            this.isPanning = true;
            this.startPoint = { x: e.clientX, y: e.clientY };
            svg.style.cursor = "grabbing";
        });

        svg.addEventListener("mousemove", (e) => {
            if (!this.isPanning) return;
            const dx = (e.clientX - this.startPoint.x) * (this.viewBox.width / svg.clientWidth);
            const dy = (e.clientY - this.startPoint.y) * (this.viewBox.height / svg.clientHeight);
            this.viewBox.x -= dx;
            this.viewBox.y -= dy;
            this.startPoint = { x: e.clientX, y: e.clientY };
            this.updateViewBox();
        });

        svg.addEventListener("mouseup", () => {
            this.isPanning = false;
            svg.style.cursor = "grab";
        });

        svg.addEventListener("mouseleave", () => {
            this.isPanning = false;
            svg.style.cursor = "grab";
        });
    }

    updateViewBox() {
        const svg = document.getElementById("zoomSvg");
        if (svg) {
            svg.setAttribute("viewBox", `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`);
        }
    }

    zoom(factor) {
        this.viewBox.width /= factor;
        this.viewBox.height /= factor;
        this.updateViewBox();
        this.analytics.trackEvent('map_zoom', `Zoom ${factor > 1 ? 'in' : 'out'}`);
    }

    resetZoom() {
        this.viewBox = { x: 0, y: 0, width: 1440, height: 1024 };
        this.updateViewBox();
        this.analytics.trackEvent('map_reset', 'Map view reset');
    }

    showFloor(floor) {
        // Hide all floors
        document.querySelectorAll('.floor-layer').forEach(layer => {
            layer.style.display = 'none';
        });
        
        // Remove active class from all buttons
        document.querySelectorAll('.floor-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected floor
        const floorLayer = document.getElementById(`${floor}-floor`);
        if (floorLayer) {
            floorLayer.style.display = 'block';
        }
        
        // Add active class to selected button
        const floorBtn = document.getElementById(`floor-${floor}`);
        if (floorBtn) {
            floorBtn.classList.add('active');
        }
        
        this.currentFloor = floor;
        this.analytics.trackEvent('floor_change', `Switched to ${floor} floor`);
    }

    showRoomCapacities() {
        const rooms = this.roomDataManager.getAllRooms();
        document.querySelectorAll('.room-clickable').forEach(room => {
            const roomInfo = rooms[room.id];
            if (roomInfo) {
                // Remove existing capacity display
                const existingCapacity = room.querySelector('.capacity-display');
                if (existingCapacity) {
                    existingCapacity.remove();
                    return;
                }
                
                // Add capacity display
                const rect = room.querySelector('rect');
                if (rect) {
                    const capacityText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    capacityText.setAttribute('class', 'capacity-display');
                    capacityText.setAttribute('x', parseFloat(rect.getAttribute('x')) + parseFloat(rect.getAttribute('width')) - 10);
                    capacityText.setAttribute('y', parseFloat(rect.getAttribute('y')) + 20);
                    capacityText.setAttribute('text-anchor', 'end');
                    capacityText.setAttribute('fill', 'white');
                    capacityText.setAttribute('font-size', '12');
                    capacityText.setAttribute('font-weight', 'bold');
                    capacityText.setAttribute('stroke', 'black');
                    capacityText.setAttribute('stroke-width', '0.5');
                    capacityText.textContent = `👥${roomInfo.capacity}`;
                    room.appendChild(capacityText);
                }
            }
        });
        
        this.analytics.trackEvent('capacity_toggle', 'Toggled room capacity display');
    }

    highlightSelected() {
        const selected = Array.from(document.getElementById('roomSelect').selectedOptions).map(opt => opt.value);

        document.querySelectorAll('g').forEach(g => {
            g.classList.remove('highlighted');
            g.querySelectorAll('rect').forEach(r => {
                r.removeAttribute('data-original-fill');
                r.style.fill = '';
            });
        });

        selected.forEach(id => {
            const group = document.getElementById(id);
            if (group) {
                group.classList.add('highlighted');
                group.querySelectorAll('rect').forEach(r => {
                    if (!r.hasAttribute('data-original-fill')) {
                        r.setAttribute('data-original-fill', r.getAttribute('fill') || 'none');
                    }
                    r.style.fill = '#00FF00';
                });
            }
        });

        this.analytics.trackEvent('room_highlight', `Highlighted ${selected.length} rooms: ${selected.join(', ')}`);
    }

    resetHighlights() {
        document.querySelectorAll('g').forEach(g => {
            g.classList.remove('highlighted');
            g.classList.remove('hovered');
            g.querySelectorAll('rect').forEach(r => {
                const original = r.getAttribute('data-original-fill');
                if (original) {
                    r.style.fill = original;
                    r.removeAttribute('data-original-fill');
                }
            });
            // Remove capacity displays
            const capacityDisplay = g.querySelector('.capacity-display');
            if (capacityDisplay) {
                capacityDisplay.remove();
            }
        });
        document.getElementById('roomSelect').selectedIndex = -1;
        this.analytics.trackEvent('room_reset', 'Room highlights reset');
    }

    filterRooms() {
        const input = document.getElementById("roomSearch").value.toLowerCase();
        const select = document.getElementById("roomSelect");
        for (let i = 0; i < select.options.length; i++) {
            const option = select.options[i];
            const txt = option.text.toLowerCase();
            option.style.display = txt.includes(input) ? "" : "none";
        }
        this.analytics.trackEvent('room_search', `Searched for: ${input}`);
    }
}