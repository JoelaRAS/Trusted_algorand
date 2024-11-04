# Trusted

Trusted is a transparent crowdfunding platform built on the Algorand blockchain. It allows users to support projects, track their progress, and participate in their success.

## Table of Contents
- [Presentation](#presentation)
- [Smart Contract Functionalities](#smart-contract-functionalities)
- [Branches](#branches)
- [Testing with sim.py](#testing-with-simpy)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Components](#components)

## Presentation

Trusted Blocks is a decentralized crowdfunding platform that leverages the Algorand blockchain to ensure transparency and accountability. Users can submit projects, contribute funds, vote on proposals, and track the progress of funded projects through various milestones.

## Smart Contract Functionalities

The Trusted Blocks smart contract includes the following functionalities:

- **Project Submission**: Users can submit new projects for crowdfunding with details like title, description, category, impact, and location.
  
- **Voting**: After project submission, users can submit bids and vote on them. Voting lasts for 30 days, and the bid with the most votes is selected as the winning bid.

- **Escrow**: Funds are held in escrow until the funding goal is reached. If the goal isn’t met within the specified period, funds are returned to contributors.

- **Milestones**: Projects are divided into milestones, defined in the winning bid. Each milestone must be validated by the project creator before progressing to the next, ensuring step-by-step project advancement.

- **Community Feedback**: Community members can provide feedback and rate the project’s progress at each milestone, maintaining transparency and accountability.

## Branches

- **Main Branch**: Developed and tested on Algorand's LocalNet.
- **Branch 2**: Contains the code for smart contract deployment on Algorand's TestNet.

## Testing with sim.py

The `sim.py` script allows testing various smart contract functionalities, such as submitting projects, submitting bids, funding projects, and checking project statuses. This script is useful for testing before the front-end integration is complete.

**Example Usage**:
- Submit a Project
- Submit a Bid
- Fund a Project
- Check Project Status

## Installation

To set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/Trusted.git

2. **Install dependencies**:
    ```bash
    Copier le code
    npm install
    Set up Tailwind CSS:

3.**Start the development server:**:
    ````bash
    npm run dev

## Features
Home Page: Explore featured projects and navigate to different sections.
Marketplace: Browse and support various projects.
Submit Project: Submit your own project for crowdfunding.
Project Details: View specific project details, including status, impact, and funding progress.
## Components
Navbar: Navigation bar with links to different sections and a Pera Wallet connection button.
ProjectCard: Displays project details, including title, description, category, impact, location, status, and funding progress.
ProjectDetails: Detailed view of a specific project, covering phases like Bidding, Funding, and Execution.
Contributing
Contributions are welcome! Follow these steps to contribute:

