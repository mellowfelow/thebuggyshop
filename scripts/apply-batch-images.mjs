import fs from 'fs';
import path from 'path';

const imageBatches = {
  // == electric-golf-buggies / walk-behind ==
  'mgi-zip-x1-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1T32pMY85A37hTQqaFShkxgmlfvk_rhkE',
    'https://drive.google.com/uc?export=view&id=16JOYnli_79fEQo1in-NCtMlhGusNyuh7',
    'https://drive.google.com/uc?export=view&id=1jqRgnT-BeKSmZt6H0q4L4a0rgViXpnPM',
    'https://drive.google.com/uc?export=view&id=1t13h9lj0mFP7hTDZZhos8XQGY8Jvqdxe',
    'https://drive.google.com/uc?export=view&id=1UEAGP6GHjdi21bV5GXXhsOmmcvDGtzda'
  ],
  'mgi-zip-x3-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1skJg-Pa5X_92JPAy-bNfJEcSGhCTN5_k',
    'https://drive.google.com/uc?export=view&id=1J7T2deVyLj-ZfeVF71Ds0iSqAuZYYYo0',
    'https://drive.google.com/uc?export=view&id=1qsBFsfRS9cjSNMfWpJnbYtf_y787WRci',
    'https://drive.google.com/uc?export=view&id=1fH3aa-bXJ-EdV0GRxrb06fpzdD9WPJ3e',
    'https://drive.google.com/uc?export=view&id=1fZY-h3xCPiryyq6lesCDDYAOpbVLj7Cv',
    'https://drive.google.com/uc?export=view&id=1X_3HzjznKkRp6AOq1VfDSJNyr_88f2IS',
    'https://drive.google.com/uc?export=view&id=1R3cKQakvnyjlglQJlN7pX5cXf5v_v5Xq'
  ],
  'mgi-zip-x5-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=19Ws7-qlRSAiccGovQVtxhJtm5YrActlu',
    'https://drive.google.com/uc?export=view&id=1lmK38YzSVSGY6YOoa_5lPo7UOO-wOKTP',
    'https://drive.google.com/uc?export=view&id=1iSAsmh1z_MYN6I78rzGheJ2mc49M003J',
    'https://drive.google.com/uc?export=view&id=1JV4WTadNi0PC2IzximxpOFuEausF9NMc',
    'https://drive.google.com/uc?export=view&id=12l1Wq4Z9SMnEtsb-fI_NnAq24C9DoC_X',
    'https://drive.google.com/uc?export=view&id=1D9KG0rkxWztwZTOYEOO6nQvrMmxRzlWw',
    'https://drive.google.com/uc?export=view&id=1LXJVlqNb8VndyZFLlfYAUqGd2S0Qy7w5'
  ],
  'motocaddy-m1-dhc-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=13hDzuhLtDrfXjRRQe6ZgkKwhYfS70AXc',
    'https://drive.google.com/uc?export=view&id=1btiFsi3A4P3kFjTyz_mINPAcj1TSpKok',
    'https://drive.google.com/uc?export=view&id=1SyCaiVeDbn5HmI__o6_MZmPTmI77d-J8'
  ],
  'powakaddy-ct6-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1fopUk91B_n1SqctEfBi-mMVsGZpHyFoj',
    'https://drive.google.com/uc?export=view&id=1t_cdNL_H1FoyFwCuequ55_n_yXJLHQ2V',
    'https://drive.google.com/uc?export=view&id=1grM-dl6buAs-t_pQkMXYJ3peu2Enzr-D',
    'https://drive.google.com/uc?export=view&id=1WhX7W_a3ArHQ8natoUfad9j_vE2HnB4g'
  ],
  'powakaddy-dlx-push-button-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1adbJcx8zzlKwrCBN8MJEXOx0teC1oDc_',
    'https://drive.google.com/uc?export=view&id=1fb6YVWnK4olB3mQ7RkCZad8ylFVlDyj4',
    'https://drive.google.com/uc?export=view&id=1xsdMpgDSdfeo7WZwvFjYPEB4gZQDl2iN'
  ],

  // == electric-golf-buggies / remote-control-golf-buggies ==
  'mgi-zip-navigator-at-remote-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1mQZvxqQUPOGb20g5UL2BIHRWWxjleryM',
    'https://drive.google.com/uc?export=view&id=1kAYCMqVRCwyEhmdpLwuHQcz-hWwN7ZsS',
    'https://drive.google.com/uc?export=view&id=1PsNufNCE2k_USwVYcJdi9yvAYsr16-NK',
    'https://drive.google.com/uc?export=view&id=1Xb_tyDzNY1eT7D8QKK3bvRgMjEyPnCWY',
    'https://drive.google.com/uc?export=view&id=1_Gju7dIvhMYRForgqqIvc2wXUx_Dltn-',
    'https://drive.google.com/uc?export=view&id=1wshlR91gnLpjt3PA8aglmxevMcxDWdJg',
    'https://drive.google.com/uc?export=view&id=1CSAdSaqiaCi2KwarHfCy-XL_WxZA3pHi'
  ],
  'mgi-ai-500-remote-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1YhBifTiYAwOhqKzbd2-G5oYoR58CWxWM',
    'https://drive.google.com/uc?export=view&id=1Se3dQZXWXPWVassT7kDORt-wcPlM-nP-',
    'https://drive.google.com/uc?export=view&id=15HGTzT3oIKWQQSO1YhLZHPEmloFzZ2Dp',
    'https://drive.google.com/uc?export=view&id=1EcI5usxTWUqDCO4Tdxw1A9vxOmFTedLE',
    'https://drive.google.com/uc?export=view&id=11E9QIC3s4jUiJHb4r-MlGZT68FXoZovm',
    'https://drive.google.com/uc?export=view&id=120dhj2IbZTQ2etYXIIAV-GsZrn88BQvY',
    'https://drive.google.com/uc?export=view&id=1jR7iCQR69l34-KwQFrvdDgRIiTCWZg90',
    'https://drive.google.com/uc?export=view&id=1HT9FYFbhaX5dudQvYNW59yhhh9JBP_uL',
    'https://drive.google.com/uc?export=view&id=1rIGiQlp5S3ibz0MlpPyFzAzVyyjblxOD',
    'https://drive.google.com/uc?export=view&id=1brV4HdvCcrLyAFsz5s8O8oeF5dVSmkXc'
  ],
  'motocaddy-m7-remote-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1eoRTql-FG4AZrYkcQ4aamx74DwoFGgMY',
    'https://drive.google.com/uc?export=view&id=1pKjit2PueGvOrBEe3AYGOMeOM5Pt0lmP',
    'https://drive.google.com/uc?export=view&id=1YvZbRP4b-pDvZZpNRGoHRw8RkjX_36OZ'
  ],
  'stinger-golf-sg4-crossover-remote-electric-buggy': [
    'https://drive.google.com/uc?export=view&id=1NDvarw5V28NOCnYu3TpAKNKikrJz1h-1',
    'https://drive.google.com/uc?export=view&id=1fdUiIJCejdnzdUoDnZGPHRjewKL1LFXy',
    'https://drive.google.com/uc?export=view&id=1DbibmFKwOut7CChakHPS2_JmCWH3Eycr',
    'https://drive.google.com/uc?export=view&id=1FTqjaBMA50szuDomj3Dx_8BA-i9FELes',
    'https://drive.google.com/uc?export=view&id=1Wcyfq5s2ogGQSNOj8jN-XiezEeu_1oIs',
    'https://drive.google.com/uc?export=view&id=1mdjDqUcDF5sV9tuqJIquaH_7aPNECpHK',
    'https://drive.google.com/uc?export=view&id=1YQ1M6fhtVYbDGyu9P5uRayIVPUKunimV'
  ],
  'alphard-cybercart-remote-electric-buggy': [
    'https://drive.google.com/uc?export=view&id=1uia5H4PaKvE_t6KF3T6M9KRcMgFwfsH9'
  ],
  'explora-r1-remote-control-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1FoS7Iiex_uTrX6iKUbFvvcNLhB3SuAY-',
    'https://drive.google.com/uc?export=view&id=100KR1Hs5DIdxY4W4L1PaarNC0Bmmx6YQ',
    'https://drive.google.com/uc?export=view&id=1bii7qaDeRK_Gw3rFVuK5_bDqbxgcqK--'
  ],
  'powakaddy-rx1-gps-remote-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1VMYBs21noqH5MSqqSC9DyPH_QJoIxdPC',
    'https://drive.google.com/uc?export=view&id=1yFbs_vadnZMs-MHRCAdv0lMr3lYFvyAA',
    'https://drive.google.com/uc?export=view&id=1kn10fpFrWtkGHVXut4SYd6RSgj-MV-bG',
    'https://drive.google.com/uc?export=view&id=1N33f411oQ7fAuXdYlluTvzYy3Q9Ct9qP'
  ],

  // == electric-golf-buggies / gps-follow ==
  'mgi-ai-navigator-gps-plus-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1D-zasKd8Qp0y3vCKjJUEdsmwTBsbf8pG',
    'https://drive.google.com/uc?export=view&id=1z-jwoa_M7g99OIo-dbtoQL0nJyFM8by1',
    'https://drive.google.com/uc?export=view&id=1nU4UJmmD19Vk4FQVn4W8OpTpwHMot-tW',
    'https://drive.google.com/uc?export=view&id=11rogFhiLBHfwUjXc9LnmG6gAeZKc_ssw',
    'https://drive.google.com/uc?export=view&id=114ErZozHib1AFh_ilDjlw_Pk_59OH1Dl',
    'https://drive.google.com/uc?export=view&id=1tm1wURX5xB2UJW2Jr145S8HObeKnZeJF',
    'https://drive.google.com/uc?export=view&id=1g85s-muxh98EIk3COPt1d4hkSAJQTIkZ',
    'https://drive.google.com/uc?export=view&id=1R4lWeYcEEZwNwksVz989gRnGtkzbLRq6',
    'https://drive.google.com/uc?export=view&id=1jWUgpmI3eITnsK-DO0dn80p0WGAkmpHk'
  ],
  'mgi-ai-navigator-halo-flagship-buggy': [
    'https://drive.google.com/uc?export=view&id=1C4vFSeXf0xt44mb0WIRxWQjjdl4oldgo',
    'https://drive.google.com/uc?export=view&id=1Lh4AcYL5cFDMX_GqmRi4Hc3Lg7Y9kfyb',
    'https://drive.google.com/uc?export=view&id=17ffMLNhfCrMNSy4oaepGi57t108RXlOD',
    'https://drive.google.com/uc?export=view&id=16q-L920kusPV1xpEIGzQsH6qpW4pDzov',
    'https://drive.google.com/uc?export=view&id=1RmE9hvzDmdsqfku-8boWmw5dy9aoo4-9',
    'https://drive.google.com/uc?export=view&id=1Um5UzFCzn4BOgoiPPKsm60D7_GWRUl_n',
    'https://drive.google.com/uc?export=view&id=1FWoLgKYcWkVEffbKqeBKqwHOodGoSPkL',
    'https://drive.google.com/uc?export=view&id=1kbRF-wUS4OWWBE0edYmwYwFKG46WgxgQ',
    'https://drive.google.com/uc?export=view&id=1r7ryOANBTln1D44sCOLEbAh2WNu8UDN8'
  ],
  'motocaddy-m5-gps-dhc-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1TqFSiErAw1ygWqKLmtwlIlBwroAypeBO',
    'https://drive.google.com/uc?export=view&id=1nlIpVbaPlUUvsOOigU5Fy4JRody9pSp-',
    'https://drive.google.com/uc?export=view&id=1r4Ei_pLUzYUv718UHWipsRuJ8iVZVXzb',
    'https://drive.google.com/uc?export=view&id=1TCXorV3tvQxf_cG_6CSIKma8JfeNu7Fs',
    'https://drive.google.com/uc?export=view&id=11RFuagooV-KSikT0qHm_OxXwJuftiGB6'
  ],
  'stewart-golf-q-follow-electric-buggy': [
    'https://drive.google.com/uc?export=view&id=1VEx07pDYg3lXOufvmKRi8kz5jo_6VpjA',
    'https://drive.google.com/uc?export=view&id=1h536xUDLMw1U9ymXj9BtzFLbBSlhmDwq',
    'https://drive.google.com/uc?export=view&id=1mr8lwsIQtEZdMOq8WghvrWr5z6td-Pnw',
    'https://drive.google.com/uc?export=view&id=1VgrqM2t5WNYFetYXvoy4fEcKBFpisenq'
  ],
  'stewart-golf-x10-follow-electric-buggy': [
    'https://drive.google.com/uc?export=view&id=1DzbNCWzDhPFdSE1EZTkrx3-LfBpUFis5',
    'https://drive.google.com/uc?export=view&id=1DcZRKJflksyaN-cCHxDB-E8zK9Ei-KBy',
    'https://drive.google.com/uc?export=view&id=1zKgciL8g-HE1yqAxNYoQsZGwhgnOS25S',
    'https://drive.google.com/uc?export=view&id=1dQjNoZ97sxBlruvjmdh-0AK_RbSMbJ_d'
  ],
  'stewart-golf-vertx-remote-electric-buggy': [
    'https://drive.google.com/uc?export=view&id=1-aGLzb7pYDDmGVjY-BgQEf2KYFo3oEYJ',
    'https://drive.google.com/uc?export=view&id=1LmKiPL_Ucbx5rVv7RbO9Y81KZ-UBfgj7',
    'https://drive.google.com/uc?export=view&id=1UEcWdlqOZTJPd8hvFG7Yrl1Mv4cZYq3I',
    'https://drive.google.com/uc?export=view&id=1_tyTM4gC0_0tx2NdhOY6jwXus7ZPxeSn',
    'https://drive.google.com/uc?export=view&id=1w9ro1G5g93XLE_B4LN62SedoOUmBYuWK',
    'https://drive.google.com/uc?export=view&id=1DON6QbZfeU1oAB3r6e0WSbIaGt81MsSZ',
    'https://drive.google.com/uc?export=view&id=1Mi5GnaX0CuoTgAJmcmQ2_LwDF5wABNNE'
  ],
  'powakaddy-fx7-gps-36-hole-electric-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1MDODggnlKbb0BWgKzKH-Dxe2b_lUik-i',
    'https://drive.google.com/uc?export=view&id=1qcdwKhmAUHKsygViDHy4WDpYCJ8KKNJ3',
    'https://drive.google.com/uc?export=view&id=1gC8ja1zOysvLctb0DlpTlAeUedXkMQwa'
  ],

  // == electric-golf-buggies / conversion-kits ==
  'alphard-club-booster-v2-pro-conversion-kit': [
    'https://drive.google.com/uc?export=view&id=1q6DC4NpWuKG4XlyNx25vBEq1NHvsGmW6',
    'https://drive.google.com/uc?export=view&id=1xH4hUFHJGlg3poAZOpsX7b7bcj6DUpVk',
    'https://drive.google.com/uc?export=view&id=1iL58PU8g05w0EcHCyA73BWN1ZGP4isx3'
  ],
  'mgi-zip-navigator-at-all-terrain-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1Wxr3g79FMj2jPj9cheYHP-dxE4vV4rTd',
    'https://drive.google.com/uc?export=view&id=1nt4fpEVaUDPK0UKYasBV6f_pWEyu3-70',
    'https://drive.google.com/uc?export=view&id=1Uf5BFVhbqAERWZPcjS8I_66LrHJiC6Ou',
    'https://drive.google.com/uc?export=view&id=1yyaXedveNrebhDxXruk3oYATT_VjJnjv'
  ],

  // == push-pull-golf-buggies / 3-wheel ==
  'clicgear-model-4-5-push-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=16C1XGN5eSEt5X90bo94HXTB6ecInpOwf',
    'https://drive.google.com/uc?export=view&id=1p0KbtelKLnLq-8giCXbehYkdzWy0cMDM'
  ],
  'big-max-iq-2-360-push-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1bPwEF4vDM3ldlLm_RpJq8NuaRJbrHPRs',
    'https://drive.google.com/uc?export=view&id=12XIh-GMx6FpHwyc3b7uYdtLwONqYmvza',
    'https://drive.google.com/uc?export=view&id=1ewGefgeE6YT_fr2z6KR_eaB0Z2NBKQvb',
    'https://drive.google.com/uc?export=view&id=18KjS7vOqI6nUgXUcnaO0aZCV_nldYq3U',
    'https://drive.google.com/uc?export=view&id=14nyp9fQA_KbgMGh8Dged-ftuwhlyi8SW'
  ],
  'clicgear-rovic-rv1s-swivel-push-golf-buggy': [
    'https://drive.google.com/uc?export=view&id=1QBoquITS6fcEpfGSdm90U0b6T6zpRBzs',
    'https://drive.google.com/uc?export=view&id=1WnCP5zVU0nEFOyquTBzM5U_Ey4vqzKVy'
  ]
};

const productsFilePath = path.resolve('src/config/products.js');
let content = fs.readFileSync(productsFilePath, 'utf-8');

let updatedCount = 0;
for (const [slug, images] of Object.entries(imageBatches)) {
  // Regex to match the product block with this slug and its images array
  const slugRegex = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?images:\\s*\\[)[\\s\\S]*?(\\])`, 'm');
  const match = content.match(slugRegex);
  if (match) {
    const formattedImages = images.map(url => `      '${url}'`).join(',\n');
    const replacement = `${match[1]}\n${formattedImages}\n    ${match[2]}`;
    content = content.replace(slugRegex, replacement);
    updatedCount++;
    console.log(`[OK] Updated images for: ${slug} (${images.length} images)`);
  } else {
    console.warn(`[WARN] Could not find slug in products.js: ${slug}`);
  }
}

fs.writeFileSync(productsFilePath, content, 'utf-8');
console.log(`Successfully updated ${updatedCount} products in ${productsFilePath}!`);
