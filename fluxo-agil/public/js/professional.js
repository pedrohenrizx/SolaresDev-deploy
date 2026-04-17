let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
  await fetchUsers();
  document.getElementById('user-select').addEventListener('change', (e) => {
    currentUser = e.target.value;
    loadData();
  });
});

async function fetchUsers() {
  try {
    const res = await fetch('/api/users');
    const users = await res.json();
    const select = document.getElementById('user-select');

    if (users.length === 0) {
      select.innerHTML = '<option disabled>No users found</option>';
      return;
    }

    select.innerHTML = users.map(u => `<option value="${u.id}">${u.name} (${u.role})</option>`).join('');
    currentUser = users[0].id;
    loadData();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function loadData() {
  if (!currentUser) return;
  fetchMyShifts();
  fetchMarketplace();
}

async function fetchMyShifts() {
  try {
    const res = await fetch(`/api/shifts/user/${currentUser}`);
    const shifts = await res.json();
    const container = document.getElementById('my-shifts-container');

    if (shifts.length === 0) {
      container.innerHTML = '<p class="text-gray-500">No shifts assigned to you.</p>';
      return;
    }

    container.innerHTML = shifts.map(shift => `
      <div class="border border-gray-200 p-4 rounded flex justify-between items-center">
        <div>
          <p class="font-bold">Sector: ${shift.sector}</p>
          <p>Time: ${new Date(shift.startTime).toLocaleString()} - ${new Date(shift.endTime).toLocaleString()}</p>
          <p>Status: ${shift.status}</p>
        </div>
        <div>
          ${!shift.availableForExchange ?
            `<button onclick="setAvailableForExchange(${shift.id}, true)" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Make Available for Exchange</button>` :
            `<button onclick="setAvailableForExchange(${shift.id}, false)" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel Exchange Availability</button>`
          }
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching my shifts:', error);
  }
}

async function fetchMarketplace() {
  try {
    const res = await fetch('/api/shifts');
    const shifts = await res.json();
    const container = document.getElementById('marketplace-container');

    // Filter available shifts not assigned to current user
    const availableShifts = shifts.filter(s => s.availableForExchange && (!s.assignedUser || String(s.assignedUser.id) !== String(currentUser)));

    if (availableShifts.length === 0) {
      container.innerHTML = '<p class="text-gray-500">No shifts available in the marketplace.</p>';
      return;
    }

    container.innerHTML = availableShifts.map(shift => `
      <div class="border border-green-200 bg-green-50 p-4 rounded flex justify-between items-center">
        <div>
          <p class="font-bold">Sector: ${shift.sector}</p>
          <p>Time: ${new Date(shift.startTime).toLocaleString()} - ${new Date(shift.endTime).toLocaleString()}</p>
          <p>Assigned to: ${shift.assignedUser ? shift.assignedUser.name : 'Unassigned'}</p>
        </div>
        <div>
          <button onclick="requestExchange(${shift.id}, ${shift.assignedUser ? shift.assignedUser.id : 'null'})" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Request Exchange</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching marketplace:', error);
  }
}

async function setAvailableForExchange(shiftId, available) {
  try {
    await fetch(`/api/shifts/${shiftId}/availableForExchange`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available })
    });
    fetchMyShifts();
    fetchMarketplace();
  } catch (error) {
    console.error('Error updating shift:', error);
  }
}

async function requestExchange(shiftId, assignedUserId) {
  if (!assignedUserId) {
    alert('Cannot request exchange for an unassigned shift. Please contact manager.');
    return;
  }

  try {
    await fetch('/api/exchanges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shiftId: shiftId,
        requester: assignedUserId, // the one originally assigned to it
        substituteId: parseInt(currentUser) // the current user requesting to take it
      })
    });
    alert('Exchange request submitted successfully. Awaiting manager approval.');
    fetchMarketplace();
  } catch (error) {
    console.error('Error requesting exchange:', error);
    alert('Failed to request exchange.');
  }
}
