exports.seed = function(knex, Promise) {

  return Promise.all([

    knex('photographers')
    .insert({
      username: 'crew',
      name: 'Crew',
      first_name: 'Crew',
      last_name: '',
      portfolio_url: 'https://crew.co',
      bio: '',
      current_location: 'Montreal',
      profile_image: 'https://images.unsplash.com/profile-1472177817227-a0ca6d7cbea6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=78eb85f020755c50bb61046b1813c00d',
      instagram_username: 'https://www.instagram.com/crewlabs/',
      email: '',
      badge: 'Unsplash Book Supporter',
      unsplash_url: 'https://unsplash.com/@crew',
      total_likes: 28,
      total_photos: 74,
      downloads: 204944,
      access_token: 'somerandomaccesstoken1'
    }),

    knex('photographers')
    .insert({
      username: 'nicholasjio',
      name: 'Nick Jio',
      first_name: 'Nick',
      last_name: 'Jio',
      portfolio_url: '',
      bio: '',
      current_location: 'san diego, ca',
      profile_image: 'https://images.unsplash.com/profile-1474225371016-1aac855180c8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=f5455c9262dfcdd7991b61385f9d58e6',
      instagram_username: '',
      email: '',
      badge: '',
      unsplash_url: 'http://unsplash.com/@nicholasjio',
      total_likes: 150,
      total_photos: 16,
      downloads: 5769,
      access_token: 'somerandomaccesstoken2'
    }),

    knex('photographers')
    .insert({
      username: 'joshuaearle',
      name: 'Joshua Earle',
      first_name: 'Joshua',
      last_name: 'Earle',
      portfolio_url: 'http://www.joshuaearlephotography.com',
      bio: 'I had a dream as a little boy that I would pack my bag one day and go and explore the world. Now you can follow me as I start to make this dream come true.',
      current_location: '',
      profile_image: 'https://images.unsplash.com/profile-1443730320833-2063ea281fe3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=6b71ebfe0a69606930e98bb863cbb61a',
      instagram_username: '',
      email: '',
      badge: 'Unsplash Book Contributor',
      unsplash_url: 'http://unsplash.com/@joshuaearle',
      total_likes: 147,
      total_photos: 19,
      downloads: 763865,
      access_token: 'somerandomaccesstoken3'
    })
  ]);
};
