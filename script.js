const users = {
  Camille: 40,
  Elise: 40,
  Nanou: 40,
  Emilie: 40,
  Inse: 40,
  Jooms: 40,
  Jens: 40,
  Jonathan: 40,
  Joren: 40,
  Patje: 40,
  Vigo: 40,
  Maxim: 40,
  Lien: 40,
  Klaas: 40,
  SilkeF: 40,
  Jip: 40,
  SilkeJ: 40,
  Tom: 40
};
let currentUser = null;
const transactions = [];

function signup() {
  const name = document.getElementById('nameSelect').value;
  if (!name) {
    alert('Selecteer een naam!');
    return;
  }
  currentUser = name;
  document.getElementById('currentUser').innerText = name;
  document.getElementById('userPoints').innerText = users[name];
  loadRecipients();
  showSection('pointsContainer');
}

function loadRecipients() {
  const recipientList = document.getElementById('recipientList');
  recipientList.innerHTML = '';
  for (const user in users) {
    if (user !== currentUser) {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="checkbox" value="${user}" class="recipient-checkbox"> ${user}
      `;
      recipientList.appendChild(label);
      recipientList.appendChild(document.createElement('br'));
    }
  }
}

function showTransactionForm() {
  showSection('transactionContainer');
}

function submitTransaction() {
  const checkboxes = document.querySelectorAll('.recipient-checkbox:checked');
  const points = parseInt(document.getElementById('pointsToGive').value);
  
  if (points < 1 || points > 18) {
    alert('Ongeldig aantal ciaokes!');
    return;
  }
  if (users[currentUser] < points * checkboxes.length) {
    alert('Niet genoeg ciaokes!');
    return;
  }

  checkboxes.forEach(checkbox => {
    const recipient = checkbox.value;
    users[currentUser] -= points;
    users[recipient] += points;
    transactions.push({ from: currentUser, to: recipient, points });
  });

  updatePointsDisplay();
  showSection('pointsContainer');
}

function updatePointsDisplay() {
  document.getElementById('userPoints').innerText = users[currentUser];
  const transactionTableBody = document.getElementById('transactionTable').querySelector('tbody');
  transactionTableBody.innerHTML = '';
  transactions
    .filter(t => t.from === currentUser || t.to === currentUser)
    .forEach(t => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${t.from}</td><td>${t.to}</td><td>${t.points}</td>`;
      transactionTableBody.appendChild(row);
    });
}

function showAllPoints() {
  alert(
    Object.entries(users)
      .map(([user, points]) => `${user}: ${points} ciaokes`)
      .join('\n')
  );
}

function goBack() {
  showSection('pointsContainer');
}

function showSection(sectionId) {
  document.querySelectorAll('.container').forEach(container => {
    container.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}
