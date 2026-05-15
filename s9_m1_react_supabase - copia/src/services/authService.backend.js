const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw new Error(error.message);
  return { token: data.session.access_token, user: data.user };
};

exports.logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

exports.getUsuarioActual = async (token) => {
  const { data, error } = await supabase.auth.getUser(token);
  if (error) throw new Error(error.message);
  return data.user;
};