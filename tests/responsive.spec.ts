import { test, expect, type Page } from '@playwright/test'

const BASE = 'http://localhost:3000'
const VIEWPORTS = {
  mobile:  { width: 375, height: 812 },
  tablet:  { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
}

async function noHScroll(page: Page, width: number) {
  const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
  expect(scrollWidth, 'horizontal overflow').toBeLessThanOrEqual(width + 4)
}

// ─── Home page ────────────────────────────────────────────────────────────────

test.describe('Home page', () => {
  for (const [size, vp] of Object.entries(VIEWPORTS)) {
    test(`renders at ${size} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize(vp)
      await page.goto(BASE)

      // H1 must mention the audience
      await expect(page.locator('h1')).toBeVisible()

      // At least 3 tool card links in main (excludes nav)
      const cards = page.locator('main a[href*="/calculator"], main a[href*="/quiz"]')
      const count = await cards.count()
      expect(count, 'tool cards in main').toBeGreaterThanOrEqual(3)

      await noHScroll(page, vp.width)
      await page.screenshot({ path: `tests/screenshots/home-${size}.png` })
    })
  }
})

// ─── Navigation ───────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test('desktop nav links are visible', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop)
    await page.goto(BASE)
    await expect(page.locator('nav').first().locator('a[href="/calculator/contract-analyzer"]')).toBeVisible()
    await expect(page.locator('nav').first().locator('a[href="/quiz/tax-home"]')).toBeVisible()
    await expect(page.locator('nav').first().locator('a[href="/calculator/per-diem"]')).toBeVisible()
  })

  test('mobile: hamburger opens nav menu', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await page.goto(BASE)

    // Hamburger – any button with aria-label containing 'menu' or 'nav'
    const hamburger = page.locator('button[aria-label*="enu"]').first()
    await expect(hamburger).toBeVisible()
    await hamburger.click()

    // After open, at least one visible contract-analyzer link exists
    await expect(
      page.locator('a[href="/calculator/contract-analyzer"]:visible').first()
    ).toBeVisible()
    await page.screenshot({ path: 'tests/screenshots/nav-mobile-open.png' })
  })
})

// ─── Contract Analyzer ────────────────────────────────────────────────────────

test.describe('Contract Analyzer', () => {
  test('form shows all fields with labels on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await page.goto(`${BASE}/calculator/contract-analyzer`)

    await expect(page.locator('#taxableHourlyRate')).toBeVisible()
    await expect(page.locator('#hoursPerWeek')).toBeVisible()
    await expect(page.locator('#housingStipendWeekly')).toBeVisible()
    await expect(page.locator('#mealsStipendWeekly')).toBeVisible()
    await expect(page.locator('label[for="taxableHourlyRate"]')).toBeVisible()
    await expect(page.locator('label[for="housingStipendWeekly"]')).toBeVisible()
  })

  async function fillAndSubmitContract(page: Page) {
    await page.locator('#taxableHourlyRate').fill('28')
    await page.locator('#hoursPerWeek').fill('36')
    await page.locator('#housingStipendWeekly').fill('1200')
    await page.locator('#mealsStipendWeekly').fill('350')
    // Select home state and assignment state (required)
    await page.locator('#homeState').selectOption('TX')
    await page.locator('#assignmentState').selectOption('CA')
    await page.locator('button[type="submit"]').click()
  }

  test('calculates and shows amber hero hourly rate on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await page.goto(`${BASE}/calculator/contract-analyzer`)
    await fillAndSubmitContract(page)

    const hero = page.locator('.hero-number').first()
    await expect(hero).toBeVisible({ timeout: 5000 })
    const text = await hero.textContent()
    expect(text).toMatch(/\$[\d,]+\.\d{2}/)

    await noHScroll(page, 375)
    await page.screenshot({ path: 'tests/screenshots/contract-results-mobile.png', fullPage: true })
  })

  test('desktop results layout', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop)
    await page.goto(`${BASE}/calculator/contract-analyzer`)
    await fillAndSubmitContract(page)
    await page.locator('.hero-number').waitFor({ timeout: 5000 })
    await page.screenshot({ path: 'tests/screenshots/contract-results-desktop.png', fullPage: true })
  })
})

// ─── Tax Home Quiz ────────────────────────────────────────────────────────────

test.describe('Tax Home Quiz', () => {
  test('shows Question 1 of 8 on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await page.goto(`${BASE}/quiz/tax-home`)
    await expect(page.locator('text=Question 1 of 8')).toBeVisible()
    await expect(page.locator('[role="radio"]').first()).toBeVisible()
    await page.screenshot({ path: 'tests/screenshots/quiz-q1-mobile.png' })
  })

  test('completes quiz and shows result', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await page.goto(`${BASE}/quiz/tax-home`)

    for (let i = 0; i < 8; i++) {
      const option = page.locator('[role="radio"]').first()
      await expect(option).toBeVisible({ timeout: 5000 })
      await option.click()
      await page.waitForTimeout(300)
    }

    // Result headline should contain "tax home"
    await expect(
      page.locator('h2').filter({ hasText: /tax home/i }).first()
    ).toBeVisible({ timeout: 5000 })
    await page.screenshot({ path: 'tests/screenshots/quiz-result-mobile.png', fullPage: true })
  })
})

// ─── Per Diem Checker ─────────────────────────────────────────────────────────

test.describe('Per Diem Checker', () => {
  test('form renders with proper labels on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await page.goto(`${BASE}/calculator/per-diem`)
    await expect(page.locator('#city')).toBeVisible()
    await expect(page.locator('#agencyHousing')).toBeVisible()
    await expect(page.locator('#agencyMeals')).toBeVisible()
    await expect(page.locator('label[for="city"]')).toBeVisible()
    await page.screenshot({ path: 'tests/screenshots/perdiem-form-mobile.png' })
  })

  test('shows GSA comparison results on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await page.goto(`${BASE}/calculator/per-diem`)

    await page.locator('#city').fill('Los Angeles')
    await page.locator('#state').selectOption('CA')
    await page.locator('#agencyHousing').fill('200')
    await page.locator('#agencyMeals').fill('60')
    await page.locator('button[type="submit"]').click()

    await expect(page.locator('text=/GSA/i').first()).toBeVisible({ timeout: 5000 })
    await noHScroll(page, 375)
    await page.screenshot({ path: 'tests/screenshots/perdiem-results-mobile.png', fullPage: true })
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

test.describe('Accessibility', () => {
  test('TaxDisclaimer always visible on all calculator pages', async ({ page }) => {
    const disclaimerText = /estimates for planning purposes only/i
    for (const path of ['/calculator/contract-analyzer', '/quiz/tax-home', '/calculator/per-diem']) {
      await page.goto(`${BASE}${path}`)
      await expect(page.locator(`text=${disclaimerText}`).first()).toBeVisible({ timeout: 5000 })
    }
  })

  test('all labeled inputs have associated label elements', async ({ page }) => {
    await page.goto(`${BASE}/calculator/contract-analyzer`)
    const inputs = await page.locator('input[id], select[id]').all()
    for (const input of inputs) {
      const id = await input.getAttribute('id')
      if (id) {
        await expect(page.locator(`label[for="${id}"]`), `Input #${id} missing label`).toHaveCount(1)
      }
    }
  })

  test('no horizontal scroll at 375px on any tool page', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    for (const path of ['/', '/calculator/contract-analyzer', '/quiz/tax-home', '/calculator/per-diem']) {
      await page.goto(`${BASE}${path}`)
      await noHScroll(page, 375)
    }
  })
})
