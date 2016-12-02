exports.seed = function(knex, Promise) {
  return knex('photographers').then(photographers => {
    return Promise.all([

      knex('campaigns')
      .insert({
        photographer_id: photographers[0].id,
        status: 'funded',
        location: 'Spain',
        sample_photo_1: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=3c83e9efe180115b8a467097379fd686',
        sample_photo_2: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=f60ba2cf0ef63152bd4e0cf9c0476049',
        sample_photo_3: 'https://images.unsplash.com/photo-1452457779869-0a9ebbbdee99?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=a854903a07cf7e0d8644fda560915234',
        description: 'I want to go to Spain because it would be really fun!',
        goal: 10000,
        raised: 20000
      }),

      knex('campaigns')
      .insert({
        photographer_id: photographers[1].id,
        status: 'active',
        location: 'Israel',
        sample_photo_1: 'https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=38cec9e87e10e9751fae7a3e700f2242',
        sample_photo_2: 'https://images.unsplash.com/photo-1474224348275-dd142b14f8c1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=3a0a24c72522023bce5353873350715c',
        sample_photo_3: 'https://images.unsplash.com/photo-1474224160858-bde653bbc5a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=e6d89696e2cb130c8bf6d8e4f6f22632',
        description: 'I want to go to Israel because it would be really fun!',
        goal: 9000,
        raised: 5000
      }),

      knex('campaigns')
      .insert({
        photographer_id: photographers[2].id,
        status: 'failed',
        location: 'Brazil',
        sample_photo_1: 'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=73661dd6a8f5edb95c75796f0529ccf0',
        sample_photo_2: 'https://images.unsplash.com/photo-1427348693976-99e4aca06bb9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=8867ebb0641ce90bb87a2e81ea76c096',
        sample_photo_3: 'https://images.unsplash.com/photo-1428954376791-d9ae785dfb2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=e5f566197bac4630b79de8e25e206727',
        description: 'I want to go to Brazil because it would be really fun!',
        goal: 2000,
        raised: 100
      })
    ]);
  });
};
