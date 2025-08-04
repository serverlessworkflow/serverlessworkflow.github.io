class VersionSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
    fetch('https://serverlessworkflow.io/versions.json')
      .catch(_ => fetch('/versions.json'))
      .then(res => res.json())
      .then(versions => this.#render(versions))
      .catch(err => console.error(`Unable to fetch versions: ${err}`));
  }

  #createOptionElement(version) {
    const option = document.createElement('option');
    option.value = version.url;
    option.textContent = version.label;
    option.selected = version.selected != null ? version.selected : false;
    option.disabled = version.disabled != null ? version.disabled : false;
    return option;
  }

  #render(versions) {
    const shadow = this.shadowRoot;
    while (shadow.firstChild) {
      shadow.removeChild(shadow.firstChild);
    }
    const select = document.createElement('select');
    if (!versions) {
      select.appendChild(this.#createOptionElement({
        label: 'loading...', 
        value: '',
        selected: true,
        disabled: true,
      }));
      select.disabled = true;
    }
    else {
      versions.forEach(version => select.appendChild(this.#createOptionElement({
        ...version,
        selected: version.url.startsWith(window.location.origin)
      })));
      select.addEventListener('change', e => {
        const url = e.target.value;
        if (!url.startsWith(window.location.origin)) {
          window.location.assign(
            window.location.pathname
              ? url + window.location.pathname + window.location.hash
              : url,
          );
        }
      });
    }
    const containerLabel = document.createElement('label');
    const label = select.options[select.selectedIndex].text;
    const span = document.createElement('span');
    span.textContent = label;
    span.classList.add('sr-only');
    containerLabel.appendChild(span);
    this.#appendIcon(
      containerLabel, 
      `M11.328 0.198L11.328 0.198L12.924 0.198Q13.260 0.240 13.848 0.303Q14.436 0.366 14.772 0.450L14.772 0.450Q17.124 1.038 19.098 2.424L19.098 2.424Q20.694 3.642 21.576 5.028L21.576 5.028Q23.298 7.296 23.676 10.278L23.676 10.278Q23.676 10.404 23.739 10.698Q23.802 10.992 23.802 11.202L23.802 11.202L23.802 12.924Q23.760 13.176 23.697 13.659Q23.634 14.142 23.550 14.352L23.550 14.352Q22.920 16.914 21.597 18.804Q20.274 20.694 18.048 22.122L18.048 22.122Q16.788 22.794 15.822 23.130L15.822 23.130Q14.604 23.592 13.428 23.676L13.428 23.676Q13.302 23.676 13.050 23.739Q12.798 23.802 12.672 23.802L12.672 23.802L10.950 23.802Q10.698 23.760 10.215 23.697Q9.732 23.634 9.522 23.550L9.522 23.550Q6.960 22.920 5.070 21.597Q3.180 20.274 1.752 18.048L1.752 18.048Q1.080 16.788 0.744 15.822L0.744 15.822Q0.282 14.604 0.198 13.428L0.198 13.428Q0.282 13.344 0.240 13.071Q0.198 12.798 0.198 12.672L0.198 12.672L0.198 11.076Q0.240 10.740 0.303 10.152Q0.366 9.564 0.450 9.228L0.450 9.228Q1.038 6.876 2.424 4.902L2.424 4.902Q3.642 3.138 5.952 1.752L5.952 1.752Q8.052 0.492 10.278 0.324L10.278 0.324Q10.488 0.324 10.824 0.261Q11.160 0.198 11.328 0.198ZM2.172 12.252L2.172 12.252Q2.214 14.898 3.579 17.124Q4.944 19.350 7.212 20.673Q9.480 21.996 12.168 21.975Q14.856 21.954 17.145 20.589Q19.434 19.224 20.736 16.872Q22.038 14.520 21.996 11.748L21.996 11.748Q21.912 9.144 20.526 6.918Q19.140 4.692 16.872 3.432L16.872 3.432Q14.478 2.088 11.748 2.172L11.748 2.172Q9.144 2.214 6.918 3.558Q4.692 4.902 3.432 7.170L3.432 7.170Q2.088 9.522 2.172 12.252ZM12.546 11.958L12.546 12Q12.672 11.874 12.987 11.685Q13.302 11.496 13.428 11.328L13.428 11.328Q15.822 9.774 16.872 8.976L16.872 8.976L16.998 8.892Q17.124 8.808 17.124 8.724L17.124 8.724Q17.292 8.514 17.565 8.577Q17.838 8.640 18.027 8.829Q18.216 9.018 18.174 9.291Q18.132 9.564 17.922 9.774L17.922 9.774L15.780 11.244Q14.352 12.210 13.722 12.798L13.722 12.798L12.252 13.848Q11.958 14.016 11.643 13.890Q11.328 13.764 11.328 13.428L11.328 13.428L11.328 4.902Q11.328 4.272 11.874 4.272L11.874 4.272Q12.084 4.146 12.315 4.314Q12.546 4.482 12.546 4.776L12.546 4.776L12.546 12L12.546 11.958Z`,
      'label-icon'
    );
    containerLabel.appendChild(select);
    this.#appendIcon(
      containerLabel,
      `M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 1 0-1.41 1.42l4.24 4.24a1.002 1.002 0 0 0 1.42 0L17 10.59a1.002 1.002 0 0 0 0-1.42Z`,
      'caret'
    );
    this.#appendStyle(shadow);
    shadow.appendChild(containerLabel);
    return;
  }

  #appendIcon(container, definition, cssClass) {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.classList.add('icon');
    icon.classList.add(cssClass);
    icon.setAttribute('width', 16);
    icon.setAttribute('height', 16);
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', 'currentColor');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.d = definition;
    path.setAttribute('d', definition);
    icon.appendChild(path);
    container.appendChild(icon);
  }

  // Style taken from Starlight's select: https://github.com/withastro/starlight/blob/ca693feb4b6aa9f26b3d536d284288773b788ac6/packages/starlight/components/Select.astro
  #appendStyle(container) {
    const style = document.createElement('style');
    style.textContent = `
	@layer starlight.core {
		label {
			--sl-label-icon-size: 0.875rem;
			--sl-caret-size: 1.25rem;
			--sl-inline-padding: 0.5rem;
			position: relative;
			display: flex;
			align-items: center;
			gap: 0.25rem;
			color: var(--sl-color-gray-1);
		}

		label:hover {
			color: var(--sl-color-gray-2);
		}

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

		.icon {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			pointer-events: none;
		}

		select {
			border: 0;
			padding-block: 0.625rem;
			padding-inline: calc(var(--sl-label-icon-size) + var(--sl-inline-padding) + 0.25rem)
				calc(var(--sl-caret-size) + var(--sl-inline-padding) + 0.25rem);
			margin-inline: calc(var(--sl-inline-padding) * -1);
			width: calc(var(--sl-select-width) + var(--sl-inline-padding) * 2);
			background-color: transparent;
			text-overflow: ellipsis;
			color: inherit;
			cursor: pointer;
			appearance: none;
		}

		option {
			background-color: var(--sl-color-bg-nav);
			color: var(--sl-color-gray-1);
		}

		@media (min-width: 50rem) {
			select {
				font-size: var(--sl-text-sm);
			}
		}
	}

	@layer starlight.components {
		.label-icon {
			font-size: var(--sl-label-icon-size);
			inset-inline-start: 0;
		}

		.caret {
			font-size: var(--sl-caret-size);
			inset-inline-end: 0;
		}
      
		svg {
			color: var(--sl-icon-color);
			font-size: var(--sl-icon-size, 1em);
			width: 1em;
			height: 1em;
		}
	}`;
    container.appendChild(style);
  }
}
customElements.define('version-select', VersionSelect);