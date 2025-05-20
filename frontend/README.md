# SpectraNet

A decentralized molecular spectroscopy data repository and exploration tool, hosted on the Internet Computer blockchain.

## Features

- Decentralized data storage on the Internet Computer blockchain
- Community-driven data verification with trust scores
- DESPEC token-powered incentives and governance
- Modern scientific UI with dark mode support

## Deployment

This is a simplified static version of SpectraNet deployed to the Internet Computer blockchain.

### Prerequisites

- Internet Computer SDK (dfx)
- An Internet Identity for authentication

### Deployment Steps

1. Ensure you're in the WSL environment:
```bash
wsl
```

2. Navigate to the project directory:
```bash
cd spectranet_canister
```

3. Deploy to the Internet Computer:
```bash
dfx deploy
```

4. Access the application:
```bash
echo "Frontend URL: http://$(dfx canister id spectranet_canister_frontend).localhost:4943"
```

## Project Structure

```
spectranet_canister/
├─ dfx.json                # Deployment configuration
├─ src/                    # Backend canister code
│  └─ spectranet_canister_backend/
├─ frontend/               # Frontend static files
│  └─ out/                 # Deployment files
│     └─ index.html        # Main application page
```

## License

This project is licensed under the MIT License.
