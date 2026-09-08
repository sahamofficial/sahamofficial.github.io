(function () {
  'use strict';

  function loadPartial(targetId, filePath) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, false);
    xhr.send(null);

    if (xhr.status === 200 && xhr.responseText) {
      target.innerHTML = xhr.responseText;
    }
  }

  function setActiveNavigation() {
    const pageKey = document.body.dataset.page || 'home';
    const activeLink = document.querySelector('.navmenu a[data-page="' + pageKey + '"]');
    if (!activeLink) return;

    document.querySelectorAll('.navmenu a').forEach(function (link) {
      link.classList.remove('active');
    });

    activeLink.classList.add('active');
  }

  loadPartial('site-header', 'assets/includes/navbar.html');
  loadPartial('site-footer', 'assets/includes/footer.html');
  setActiveNavigation();
})();
