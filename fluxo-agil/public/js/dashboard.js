document.addEventListener('DOMContentLoaded', () => {
  fetchAlerts();
  fetchExchanges();
});

async function fetchAlerts() {
  try {
    const res = await fetch('/api/shifts/critical');
    const shifts = await res.json();
    const container = document.getElementById('alerts-container');

    if (shifts.length === 0) {
      container.innerHTML = '<p class="text-green-600 font-semibold">All scales are healthy!</p>';
      return;
    }

    container.innerHTML = shifts.map(shift => `
      <div class="border-l-4 border-red-500 bg-red-50 p-4 rounded">
        <p class="font-bold">Sector: ${shift.sector}</p>
        <p>Time: ${new Date(shift.startTime).toLocaleString()} - ${new Date(shift.endTime).toLocaleString()}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
}

async function fetchExchanges() {
  try {
    const res = await fetch('/api/exchanges/pending');
    const exchanges = await res.json();
    const container = document.getElementById('exchanges-container');

    if (exchanges.length === 0) {
      container.innerHTML = '<p class="text-gray-500">No pending exchange requests.</p>';
      return;
    }

    container.innerHTML = exchanges.map(ex => `
      <div class="border border-gray-200 p-4 rounded flex justify-between items-center">
        <div>
          <p class="font-bold">Sector: ${ex.shift.sector}</p>
          <p>Requester: ${ex.requester.name} (CPF: ${ex.requester.cpf})</p>
          <p>Substitute: ${ex.substitute.name} (CPF: ${ex.substitute.cpf})</p>
        </div>
        <div>
          <button onclick="approveExchange(${ex.id})" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Approve</button>
          <button onclick="rejectExchange(${ex.id})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">Reject</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching exchanges:', error);
  }
}

async function approveExchange(id) {
  try {
    await fetch(`/api/exchanges/${id}/approve`, { method: 'PUT' });
    fetchExchanges();
    fetchAlerts();
  } catch (error) {
    console.error('Error approving exchange:', error);
  }
}

async function rejectExchange(id) {
  try {
    await fetch(`/api/exchanges/${id}/reject`, { method: 'PUT' });
    fetchExchanges();
  } catch (error) {
    console.error('Error rejecting exchange:', error);
  }
}
