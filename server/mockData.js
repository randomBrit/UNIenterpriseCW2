const mockStories = [
  {
    "title": "Last Exit to Eden",
    "author": "Sierra Vale",
    "authorId": "user_abc123",
    "genre": "Dystopian",
    "content": "She wasn’t supposed to remember the before-times, but the dreams said otherwise.",
    "rating": {
      "average": 3.5,
      "entries": [
        { "rater": "user_xyz111", "rating": 3.5 },
        { "rater": "user_mno222", "rating": 3.7 },
        { "rater": "user_pqr333", "rating": 3.3 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "The Ember Crown",
    "author": "Nico Reyes",
    "authorId": "user_xyz789",
    "genre": "Fantasy",
    "content": "A kingdom built on fire and ash must choose its heir before it crumbles.",
    "rating": {
      "average": 4.35,
      "entries": [
        { "rater": "user_aaa111", "rating": 4.5 },
        { "rater": "user_bbb222", "rating": 4.2 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Echoes of the Ninth Moon",
    "author": "Haley Quinn",
    "authorId": "user_jkl456",
    "genre": "Science Fiction",
    "content": "Every ninth moon, the colony sends a signal—and something finally answered.",
    "rating": {
      "average": 4.15,
      "entries": [
        { "rater": "user_ccc333", "rating": 4.0 },
        { "rater": "user_ddd444", "rating": 4.3 },
        { "rater": "user_eee555", "rating": 4.1 },
        { "rater": "user_fff666", "rating": 4.2 }
      ]
    },
    "isPublic": false
  },
  {
    "title": "Letters to Nowhere",
    "author": "Tobias Glen",
    "authorId": "user_def234",
    "genre": "Drama",
    "content": "The letters started arriving after she died, all addressed to me.",
    "rating": {
      "average": 3.75,
      "entries": [
        { "rater": "user_ggg777", "rating": 3.6 },
        { "rater": "user_hhh888", "rating": 3.9 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "The Hollow Pact",
    "author": "D.M. Corvin",
    "authorId": "user_lmn888",
    "genre": "Fantasy",
    "content": "He made the deal with blood, never expecting the shadows to whisper back.",
    "rating": {
      "average": 4.0,
      "entries": [
        { "rater": "user_iii999", "rating": 4.0 },
        { "rater": "user_jjj000", "rating": 3.8 },
        { "rater": "user_kkk111", "rating": 4.2 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Static Dreams",
    "author": "Aria Chen",
    "authorId": "user_hzq010",
    "genre": "Cyberpunk",
    "content": "Reality was optional in the city where memories could be hacked.",
    "rating": {
      "average": 3.55,
      "entries": [
        { "rater": "user_lll222", "rating": 3.5 },
        { "rater": "user_mmm333", "rating": 3.6 }
      ]
    },
    "isPublic": false
  },
  {
    "title": "Under Painted Skies",
    "author": "Rowan Black",
    "authorId": "user_uvw321",
    "genre": "Romance",
    "content": "They met beneath the mural she’d painted, both hiding from their pasts.",
    "rating": {
      "average": 4.55,
      "entries": [
        { "rater": "user_nnn444", "rating": 4.7 },
        { "rater": "user_ooo555", "rating": 4.6 },
        { "rater": "user_ppp666", "rating": 4.5 },
        { "rater": "user_qqq777", "rating": 4.4 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Gallows Creek",
    "author": "Mira Dalton",
    "authorId": "user_ghr567",
    "genre": "Horror",
    "content": "The water in Gallows Creek ran red every fall—and no one questioned it.",
    "rating": {
      "average": 3.9,
      "entries": [
        { "rater": "user_rrr888", "rating": 3.8 },
        { "rater": "user_sss999", "rating": 4.0 },
        { "rater": "user_ttt000", "rating": 3.9 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Clockwork Hearts",
    "author": "Felix Ward",
    "authorId": "user_smn234",
    "genre": "Steampunk",
    "content": "She built him out of gears and copper—then he started dreaming.",
    "rating": {
      "average": 4.2,
      "entries": [
        { "rater": "user_uuu111", "rating": 4.1 },
        { "rater": "user_vvv222", "rating": 4.3 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Beneath Crimson Leaves",
    "author": "Evelyn Hart",
    "authorId": "user_bft982",
    "genre": "Romance",
    "content": "Autumn had always been her favorite, but this year, the leaves fell with a promise.",
    "rating": {
      "average": 4.65,
      "entries": [
        { "rater": "user_www333", "rating": 4.5 },
        { "rater": "user_xxx444", "rating": 4.6 },
        { "rater": "user_yyy555", "rating": 4.8 },
        { "rater": "user_zzz666", "rating": 4.7 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Infinite Carousel",
    "author": "Zane Holloway",
    "authorId": "user_xce100",
    "genre": "Magical Realism",
    "content": "Every night, the carousel spun without power, waiting for one last rider.",
    "rating": {
      "average": 4.05,
      "entries": [
        { "rater": "user_aaa777", "rating": 4.0 },
        { "rater": "user_bbb888", "rating": 4.1 }
      ]
    },
    "isPublic": false
  },
  {
    "title": "Nocturne Protocol",
    "author": "Kira Leone",
    "authorId": "user_klo321",
    "genre": "Thriller",
    "content": "When the alarms failed, the protocol began—and no one was safe.",
    "rating": {
      "average": 3.75,
      "entries": [
        { "rater": "user_ccc999", "rating": 3.9 },
        { "rater": "user_ddd000", "rating": 3.6 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "The Library of Bones",
    "author": "Orin Hale",
    "authorId": "user_zzz111",
    "genre": "Dark Fantasy",
    "content": "The books whispered when opened, and some screamed when shut.",
    "rating": {
      "average": 4.4,
      "entries": [
        { "rater": "user_eee111", "rating": 4.2 },
        { "rater": "user_fff222", "rating": 4.4 },
        { "rater": "user_ggg333", "rating": 4.6 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Neon Ashes",
    "author": "Delilah Storm",
    "authorId": "user_pqr654",
    "genre": "Cyberpunk",
    "content": "After the blackout, the city rose again—this time with fire in its veins.",
    "rating": {
      "average": 3.3,
      "entries": [
        { "rater": "user_hhh444", "rating": 3.2 },
        { "rater": "user_iii555", "rating": 3.3 },
        { "rater": "user_jjj666", "rating": 3.4 }
      ]
    },
    "isPublic": false
  },
  {
    "title": "Fragments of Silence",
    "author": "Leo Amar",
    "authorId": "user_ytv333",
    "genre": "Literary Fiction",
    "content": "The silence wasn’t peaceful anymore—it was a reminder of what he lost.",
    "rating": {
      "average": 4.1,
      "entries": [
        { "rater": "user_kkk777", "rating": 4.0 },
        { "rater": "user_lll888", "rating": 4.2 },
        { "rater": "user_mmm999", "rating": 4.1 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "The Pale Signal",
    "author": "Sierra Vale",
    "authorId": "user_abc123",
    "genre": "Dystopian",
    "content": "The radios hadn’t worked in years—until the static whispered her name.",
    "rating": {
      "average": 3.6,
      "entries": [
        { "rater": "user_rss001", "rating": 3.4 },
        { "rater": "user_rss002", "rating": 3.8 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Saltlight",
    "author": "Sierra Vale",
    "authorId": "user_abc123",
    "genre": "Dystopian",
    "content": "They bathed in chemical oceans, searching for the last unburned sky.",
    "rating": {
      "average": 3.9,
      "entries": [
        { "rater": "user_rss003", "rating": 4.0 },
        { "rater": "user_rss004", "rating": 3.8 }
      ]
    },
    "isPublic": false
  },
  {
    "title": "Archive of Dust",
    "author": "Sierra Vale",
    "authorId": "user_abc123",
    "genre": "Dystopian",
    "content": "In the vault beneath the city, the forgotten memories began to hum.",
    "rating": {
      "average": 3.75,
      "entries": [
        { "rater": "user_rss005", "rating": 3.6 },
        { "rater": "user_rss006", "rating": 3.9 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Thorns of the Crownless",
    "author": "Nico Reyes",
    "authorId": "user_xyz789",
    "genre": "Fantasy",
    "content": "The prophecy named a queen—but he was born with the mark.",
    "rating": {
      "average": 4.4,
      "entries": [
        { "rater": "user_elf001", "rating": 4.5 },
        { "rater": "user_elf002", "rating": 4.3 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Wyrm’s Hollow",
    "author": "Nico Reyes",
    "authorId": "user_xyz789",
    "genre": "Fantasy",
    "content": "A dragon slumbers below the city—and the council wants to wake it.",
    "rating": {
      "average": 4.2,
      "entries": [
        { "rater": "user_elf003", "rating": 4.1 },
        { "rater": "user_elf004", "rating": 4.3 }
      ]
    },
    "isPublic": false
  },
  {
    "title": "Glass Warden",
    "author": "Nico Reyes",
    "authorId": "user_xyz789",
    "genre": "Fantasy",
    "content": "She could sculpt magic into glass—but only if she didn’t look away.",
    "rating": {
      "average": 4.6,
      "entries": [
        { "rater": "user_elf005", "rating": 4.7 },
        { "rater": "user_elf006", "rating": 4.5 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "Copper Leviathan",
    "author": "Felix Ward",
    "authorId": "user_smn234",
    "genre": "Steampunk",
    "content": "The machine god rose from the trench—and it wanted a pilot.",
    "rating": {
      "average": 4.3,
      "entries": [
        { "rater": "user_gear001", "rating": 4.4 },
        { "rater": "user_gear002", "rating": 4.2 }
      ]
    },
    "isPublic": true
  },
  {
    "title": "The Skylock Mechanism",
    "author": "Felix Ward",
    "authorId": "user_smn234",
    "genre": "Steampunk",
    "content": "Time unraveled slowly, but he could feel the gears start to grind.",
    "rating": {
      "average": 4.15,
      "entries": [
        { "rater": "user_gear003", "rating": 4.1 },
        { "rater": "user_gear004", "rating": 4.2 }
      ]
    },
    "isPublic": false
  },
  {
    "title": "Brassheart",
    "author": "Felix Ward",
    "authorId": "user_smn234",
    "genre": "Steampunk",
    "content": "She wound her heart each morning, afraid one day it wouldn’t start.",
    "rating": {
      "average": 4.5,
      "entries": [
        { "rater": "user_gear005", "rating": 4.6 },
        { "rater": "user_gear006", "rating": 4.4 }
      ]
    },
    "isPublic": true
  }
]

export default mockStories;