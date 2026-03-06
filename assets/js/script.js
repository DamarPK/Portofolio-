function loadContent(page) {
  const area = document.getElementById('content-area');
  const loading = document.getElementById('loading');
  const target = document.getElementById('loaded-content');

  if (!area) return; // safety

  area.classList.remove('hidden');
  if (loading) loading.classList.remove('hidden');
  if (target) target.innerHTML = '';

  if (area) area.scrollIntoView({ behavior: 'smooth', block: 'start' });

  fetch(page + '.html')
    .then(res => {
      if (!res.ok) throw new Error('Halaman ' + page + '.html gak ditemukan (404)');
      return res.text();
    })
    .then(html => {
      if (loading) loading.classList.add('hidden');
      if (target) target.innerHTML = html;
    })
    .catch(err => {
      if (loading) loading.classList.add('hidden');
      if (target) target.innerHTML = '<div class="text-center py-20"><p class="text-3xl font-bold text-red-600">Error: ' + err.message + '</p><p class="mt-4">Cek nama file atau commit ulang ya bro.</p><button onclick="backToHome()" class="mt-6 px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg">Kembali ke Home</button></div>';
    });
}

function backToHome() {
  const area = document.getElementById('content-area');
  if (area) area.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
