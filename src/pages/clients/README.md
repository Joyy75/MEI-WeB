# Client Pages

## MemberList.page.jsx

A simple, clean member list page for the client side with the following features:

### Features:
- **Simple Card-based UI**: Clean, minimal design for better UX
- **Search Functionality**: Search members by name, position, or other details
- **Simple Statistics**: Shows total members, departments, and teams
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Pagination**: Handles large lists of members efficiently
- **Navigation Integration**: Seamlessly integrates with the existing navigation system

### Key Components:
- **Simple Header**: Clean title and description
- **Search Bar**: Simple search input with icon
- **Stats Cards**: Three simple cards showing key metrics
- **Member Grid**: Responsive grid of member cards
- **Pagination**: Navigation for multiple pages

### Member Cards Include:
- Profile image
- Name and position
- Department and team information
- Contact details (email)
- "View Profile" button with eye icon

### Navigation:
- Clicking "View Profile" navigates to `/members/:id`
- The detail page works for both client and admin users
- Back button intelligently routes to the correct list page

### Styling:
- Uses Tailwind CSS for consistent styling
- Clean borders and simple shadows
- Subtle hover effects
- Responsive breakpoints for all screen sizes

### Integration:
- Uses existing hooks (`useVolunteersQuery`)
- Compatible with existing components (`Loading`, `Pagination`)
- Follows the established routing pattern
- Integrates with the navigation menu 