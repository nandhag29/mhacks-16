

function Logo() {
  return(
    <a href="/" className="ml-2">
        <img
            src="LOGO.png"
            style={{ width: '300px', height: 'auto', maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
            alt="Logo"
        />
    </a>
  );
}

export default Logo;
