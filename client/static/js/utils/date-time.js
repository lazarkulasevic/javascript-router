const getLocalDate = date => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })

export { getLocalDate }