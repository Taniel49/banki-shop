import './index.css';

const RVSB = new URL('./images/RV-SB.png', import.meta.url);
const TVLdV = new URL('./images/TV-LdV.png', import.meta.url);
const RAM = new URL('./images/RA-M.png', import.meta.url);
const UAR = new URL('./images/UA-R.png', import.meta.url);

let initialCards = [
    {
        id: '1',
        isPurchased: false,
        isOnSale: true,
        isAdded: localStorage.getItem('1 isAdded') ? true : false,
        isInProcess: false,
        cardImage: RVSB,
        cardName: '«Рождение Венеры» Сандро Боттичелли',
        firstPrice: '2 000 000 $',
        finalPrice: '1 000 000 $',
        description: '«Рождение Венеры» (итал. Nascita di Venere) — картина итальянского художника тосканской школы Сандро Боттичелли. Представляет собой живопись темперой на холсте размером 172,5 × 278,5 см. В настоящее время хранится в галерее Уффици, Флоренция.'
    },
    {
        id: '2',
        isPurchased: false,
        isOnSale: false,
        isAdded: localStorage.getItem('2 isAdded') ? true : false,
        isInProcess: false,
        cardImage: TVLdV,
        cardName: '«Тайная вечеря» Леонардо да Винчи',
        firstPrice: '',
        finalPrice: '3 000 000 $',
        description: '«Та́йная ве́черя» (итал. Il Cenacolo или L’Ultima Cena) — монументальная роспись, (ошибочно называемая фреской: картина написана темперой по сухому грунту, а не по влажной штукатурке) работы Леонардо да Винчи, изображающая сцену последней трапезы Христа со своими учениками. Создана в 1495—1498 годы в доминиканском монастыре Санта-Мария-делле-Грацие в Милане.'
    },
    {
        id: '3',
        isPurchased: false,
        isOnSale: true,
        isAdded: true,
        isInProcess: false,
        cardImage: RAM,
        cardName: '«Сотворение Адама» Микеланджело',
        firstPrice: '6 000 000 $',
        finalPrice: '5 000 000 $',
        description: '«Сотворение Адама» (итал. La creazione di Adamo) — фреска Микеланджело, написанная около 1511 года.'
    },
    {
        id: '4',
        isPurchased: true,
        isOnSale: false,
        isAdded: localStorage.getItem('4 isAdded') ? true : false,
        isInProcess: false,
        cardImage: UAR,
        cardName: '«Урок анатомии» Рембрандт',
        firstPrice: '',
        finalPrice: '',
        description: ''
    }
];

const app = {
    data() {
        return {
            cardsForDisplay: [],
            buttonText: 'Купить',
            buttonAddedText: 'В корзине',
            buttonInProcessText: 'Добавляем',
            searchInputValue: '',
            isPopupOpened: false,
            popupImage: '',
            popupName: '',
            popupInfo: '',
            popupPrice: '',
            isMenuOpened: false,
        };
    }, methods: {
        onSubmit(e) {
            e.preventDefault();
            this.searchInputValue = document.querySelector('.header__search-input').value;
        }, onClick(card) {
            if (!card.isAdded) {
                card.isInProcess = true;
                setTimeout(() => {
                    card.isInProcess = false;
                    card.isAdded = true;
                    localStorage.setItem(`${card.id} isAdded`, 'added')
                }, "2000");
            }
        }, onImageClick(card) {
            if (!card.isPurchased) {
                this.popupImage = card.cardImage;
                this.popupName = card.cardName;
                this.popupInfo = card.description;
                this.popupPrice = card.finalPrice;
                this.isPopupOpened = true;
            }
        },
        onCloseClick() {
            this.isPopupOpened = false;
            this.popupImage = '';
            this.popupName = '';
            this.popupInfo = '';
            this.popupPrice = '';
        },
        onMenuClick() {
            this.isMenuOpened = true;
        },
        onCloseMenuClick() {
            this.isMenuOpened = false;
        }
    }, computed: {
        filter() {
            if (!this.searchInputValue) {
                return this.cardsForDisplay;
            } else {
                return this.cardsForDisplay.filter(({cardName}) => (cardName).toLowerCase().includes(this.searchInputValue.toLowerCase()));
            }
        },
    }, mounted() {
        this.cardsForDisplay = [...initialCards];
    },
};

Vue.createApp(app).mount('#app');