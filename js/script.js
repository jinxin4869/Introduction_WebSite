// ===== DOM ELEMENTS（DOM要素の取得） =====
// HTMLから必要な要素を取得し、変数に格納
const navToggle = document.getElementById('nav-toggle');     // ハンバーガーメニューボタン
const navMenu = document.getElementById('nav-menu');         // ナビゲーションメニュー
const navLinks = document.querySelectorAll('.nav__link');    // すべてのナビゲーションリンク
const scrollTopBtn = document.getElementById('scroll-top');  // スクロールトップボタン
const contactForm = document.getElementById('contact-form'); // お問い合わせフォーム
const skillBars = document.querySelectorAll('.skill-bar__fill'); // スキルバーの進捗要素
const sections = document.querySelectorAll('section[id]');   // ID付きのセクション要素

// ===== MOBILE NAVIGATION（モバイルナビゲーション） =====
// ハンバーガーメニューの開閉機能
function toggleMobileNav() {
    setMobileNav(!navMenu.classList.contains('show'));
}

// モバイルナビゲーションを閉じる
function closeMobileNav() {
    setMobileNav(false);
}

// 開閉状態を見た目・スクリーンリーダー・スクロールロックに一括反映
function setMobileNav(open) {
    navMenu.classList.toggle('show', open);          // メニューの表示/非表示
    navToggle.classList.toggle('active', open);      // ハンバーガー ⇔ ×
    navToggle.setAttribute('aria-expanded', open);
    navToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    // メニューが開いている間はページスクロールを無効化
    document.body.style.overflow = open ? 'hidden' : '';
}

// ===== SMOOTH SCROLLING（スムーススクロール） =====
// ナビゲーションリンククリック時の滑らかなスクロール機能
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId); // ターゲット要素を取得
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight; // ヘッダー高さを取得
        const targetPosition = targetElement.offsetTop - headerHeight;       // スクロール位置計算
        
        // 滑らかにスクロール実行
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== SCROLL TO TOP BUTTON（トップに戻るボタン） =====
// スクロール位置に応じてボタンの表示/非表示を制御
function toggleScrollTopButton() {
    if (window.scrollY > 300) {        // 300px以上スクロールした場合
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

// ページトップに滑らかにスクロール
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== ACTIVE NAVIGATION LINK（アクティブナビゲーション） =====
// 現在表示中のセクションに対応するナビゲーションリンクをハイライト
function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100; // スクロール位置（少しオフセット）
    
    // 各セクションをチェック
    sections.forEach(section => {
        const sectionTop = section.offsetTop;      // セクションの上端位置
        const sectionHeight = section.offsetHeight; // セクションの高さ
        const sectionId = section.getAttribute('id'); // セクションのID
        
        // 現在のスクロール位置がセクション内にある場合
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');    // 全リンクのactiveクラスを削除
                // 対応するリンクにactiveクラスを追加
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== SKILL BARS ANIMATION（スキルバーアニメーション） =====
// スキルセクションが表示されたときにプログレスバーをアニメーション
function animateSkillBars() {
    const skillsSection = document.getElementById('skills');
    const skillsSectionTop = skillsSection.offsetTop;       // スキルセクションの上端
    const skillsSectionHeight = skillsSection.offsetHeight; // スキルセクションの高さ
    const scrollPos = window.scrollY + window.innerHeight; // 現在のスクロール位置＋ウィンドウ高さ
    
    // スキルセクションが画面内に入った場合
    if (scrollPos >= skillsSectionTop && scrollPos <= skillsSectionTop + skillsSectionHeight) {
        skillBars.forEach(bar => {
            // まだアニメーションしていない場合のみ実行
            if (!bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width'); // data-width属性から幅を取得
                bar.style.width = width + '%';                // 幅をアニメーション
                bar.classList.add('animated');               // アニメーション済みマークを追加
            }
        });
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS（交差監視によるアニメーション） =====
// 要素が画面に入ったときにフェードインアニメーションを実行
function createObserver() {
    const observerOptions = {
        threshold: 0.1,                    // 要素の10%が見えたらトリガー
        rootMargin: '0px 0px -50px 0px'   // 下マージンで早めに発動
    };
    
    // 交差監視オブザーバーを作成
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {    // 要素が画面内に入った場合
                entry.target.style.opacity = '1';           // 透明度を1に
                entry.target.style.transform = 'translateY(0)'; // Y軸移動をリセット
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を選択
    const animatedElements = document.querySelectorAll('.stat, .timeline__item, .experience__item, .contact__detail');
    
    // 各要素を監視対象に追加し、初期状態を設定
    animatedElements.forEach(el => {
        el.style.opacity = '0';                              // 初期状態：透明
        el.style.transform = 'translateY(20px)';             // 初期状態：下に20px移動
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // トランジション設定
        observer.observe(el);                                // 監視開始
    });
}

// ===== CONTACT FORM HANDLING（お問い合わせフォーム処理） =====
// フォーム送信時の処理（バリデーション含む）
function handleContactForm(e) {
    e.preventDefault(); // デフォルトのフォーム送信を防止
    
    // フォームデータの取得
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // 入力値の基本バリデーション
    if (!name || !email || !subject || !message) {
        showNotification('すべての項目を入力してください。', 'error');
        return;
    }
    
    // メールアドレス形式のバリデーション
    if (!isValidEmail(email)) {
        showNotification('有効なメールアドレスを入力してください。', 'error');
        return;
    }
    
    // 送信ボタンの状態変更（二重送信防止）
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;
    
    // 実際の送信処理（ここではシミュレーション）
    // 実際のプロジェクトでは、ここでサーバーへのAPI送信処理を行う
    setTimeout(() => {
        showNotification('メッセージが送信されました。ありがとうございます！', 'success');
        contactForm.reset(); // フォームをリセット
        
        // ボタンを元の状態に戻す
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// ===== EMAIL VALIDATION（メールアドレスバリデーション） =====
// 正規表現を使用してメールアドレス形式をチェック
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // メールアドレスの正規表現
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM（通知システム） =====
// 成功・エラー・情報メッセージを画面右上に表示
function showNotification(message, type = 'info') {
    // 既存の通知があれば削除（重複防止）
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 通知要素を動的作成
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // 通知のスタイルを動的設定
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // フェードインアニメーション
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 閉じるボタンの処理
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
    `;
    
    // 閉じるボタンクリック時の処理
    closeBtn.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // 5秒後に自動削除
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== HEADER SCROLL EFFECT（ヘッダースクロール効果） =====
// スクロール時にヘッダーの背景とシャドウを変更
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {  // 50px以上スクロールした場合
        header.style.background = 'rgba(245, 241, 230, 0.98)';     // 背景を濃く
        header.style.boxShadow = '0 2px 20px rgba(28, 31, 34, 0.08)'; // シャドウ追加
    } else {
        header.style.background = 'rgba(245, 241, 230, 0.95)';     // 背景を薄く
        header.style.boxShadow = 'none';                           // シャドウなし
    }
}

// ===== TYPING ANIMATION（タイピングアニメーション） =====
// ヒーローセクションの名前部分にタイプライター効果を追加
function initTypingAnimation() {
    const typingElement = document.querySelector('.hero__name');
    if (!typingElement) return; // 要素が存在しない場合は終了
    
    const text = typingElement.textContent;  // 元のテキストを取得
    typingElement.textContent = '';          // テキストをクリア
    typingElement.style.borderRight = '2px solid #b3402c'; // カーソル効果（朱色）
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i); // 1文字ずつ追加
            i++;
            setTimeout(typeWriter, 100); // 100ms間隔で次の文字
        } else {
            // タイピング完了後、カーソルを削除
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // 1秒遅延してからアニメーション開始
    setTimeout(typeWriter, 1000);
}

// ===== EVENT LISTENERS（イベントリスナーの設定） =====
// DOM読み込み完了後に実行される初期化処理
document.addEventListener('DOMContentLoaded', () => {
    // 初期化関数の実行
    createObserver();        // 交差監視オブザーバー初期化
    initTypingAnimation();   // タイピングアニメーション初期化

    // フッターの著作権表示年を自動更新
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    
    // ===== ナビゲーション関連イベント =====
    // ハンバーガーメニューボタンのクリックイベント
    navToggle.addEventListener('click', toggleMobileNav);
    
    // 各ナビゲーションリンクのクリックイベント
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();                     // デフォルトリンク動作を防止
            const targetId = link.getAttribute('href'); // リンク先ID取得
            smoothScroll(targetId);                 // スムーススクロール実行
            closeMobileNav();                       // モバイルメニューを閉じる
        });
    });
    
    // ===== スクロール関連イベント =====
    // スクロール時に複数の機能を実行
    window.addEventListener('scroll', () => {
        toggleScrollTopButton();  // スクロールトップボタンの表示制御
        updateActiveNavLink();    // アクティブナビゲーションリンクの更新
        animateSkillBars();       // スキルバーアニメーション
        handleHeaderScroll();     // ヘッダーの見た目変更
    });
    
    // ===== ボタンクリックイベント =====
    // スクロールトップボタンのクリックイベント
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // ===== フォーム関連イベント =====
    // お問い合わせフォームの送信イベント
    contactForm.addEventListener('submit', handleContactForm);
    
    // ===== キーボードイベント =====
    // Escキー押下でモバイルメニューを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
        }
    });
    
    // ===== ウィンドウリサイズイベント =====
    // 画面サイズ変更時の処理
    window.addEventListener('resize', () => {
        // デスクトップサイズになったらモバイルメニューを自動で閉じる
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
});

// ===== PERFORMANCE OPTIMIZATION（パフォーマンス最適化） =====
// スクロールイベントの最適化（requestAnimationFrameを使用）
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}

// ===== UTILITIES（ユーティリティ関数） =====
// デバウンス関数：連続呼び出しを制限
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スロットル関数：一定間隔での実行に制限
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ACCESSIBILITY IMPROVEMENTS（アクセシビリティ向上） =====
// キーボードナビゲーション時のフォーカス表示制御
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard'); // キーボード使用中マーク
    }
});

// マウス使用時はキーボードフォーカススタイルを無効化
document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// ===== ANALYTICS & TRACKING（分析・トラッキング） =====
// イベントトラッキング用の関数（オプション）
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // ここにGoogle Analyticsや他のトラッキングコードを追加可能
    // 例：gtag('event', eventName, eventData);
}

// イベントトラッキングの実装例
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('navigation_click', {
            section: link.getAttribute('href') // クリックされたセクション
        });
    });
});

// フォーム送信トラッキング
contactForm.addEventListener('submit', () => {
    trackEvent('contact_form_submit');
});

// ===== CONSOLE MESSAGE（コンソールメッセージ） =====
// 開発者向けの情報表示
console.log(`
🎨 ポートフォリオサイト by 陳 錦鑫 (Jinxin Chen)
📧 お問い合わせ: jinxin10244869@gmail.com
🚀 Built with HTML, CSS, and JavaScript

Thanks for visiting!
`);
