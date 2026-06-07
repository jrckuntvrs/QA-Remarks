document.addEventListener('DOMContentLoaded', function() {
    
    const scopeCards = document.querySelectorAll('#scopeCardGroup .card');
    const hiddenTypeInput = document.getElementById('verificationType');
    const statusSelect = document.getElementById('verificationStatus');
    const outputContainer = document.getElementById('outputContainer');
    const remarksForm = document.getElementById('remarksGenerationForm');
    const generatedRemarksBox = document.getElementById('generatedRemarksBox');
    const copyTextBtn = document.getElementById('copyTextBtn');

    const statusOptionsMap = {
        residence: [
            { value: "verified", text: "Verified" },
            { value: "unknown", text: "Unknown / Address Located" },
            { value: "closed", text: "Closed / Unattended" },
            { value: "unlocated", text: "Unlocated" },
            { value: "denied", text: "Denied Entry" },
            { value: "moved", text: "Moved Out" }
        ],
        employment: [
            { value: "verified", text: "Verified" },
            { value: "unknown", text: "Unknown Employment" },
            { value: "closed", text: "Employer Closed" },
            { value: "unlocated", text: "Employer Unlocated" },
            { value: "resigned", text: "Resigned / Terminated" },
            { value: "denied", text: "Denied Entry" }

        ],
        business: [
            { value: "verified", text: "Verified" },
            { value: "unknown", text: "Business Unknown" },
            { value: "closed", text: "Business Close" },
            { value: "unlocated", text: "Business Unlocated" },
            { value: "denied", text: "Denied Entry" },
            { value: "moved", text: "Moved Out" }

        ]
    };

    // Category Card Selection Triggers
    scopeCards.forEach(card => {
        card.addEventListener('click', function() {
            scopeCards.forEach(c => { c.classList.remove('border-primary', 'bg-light'); });
            this.classList.add('border-primary', 'bg-light');

            const chosenValue = this.getAttribute('data-value');
            hiddenTypeInput.value = chosenValue;

            let optionsHtml = '<option value="">-- Choose Result Status --</option>';
            statusOptionsMap[chosenValue].forEach(opt => {
                optionsHtml += `<option value="${opt.value}">${opt.text}</option>`;
            });
            
            statusSelect.innerHTML = optionsHtml;
            statusSelect.disabled = false;

            hideAllFormSections();
            if(outputContainer) outputContainer.classList.add('hidden-section');
        });
    });

    // Dynamic Form Routing Toggles
    statusSelect.addEventListener('change', function() {
        const scope = hiddenTypeInput.value;
        const currentStatus = this.value;

        hideAllFormSections();
        if(outputContainer) outputContainer.classList.add('hidden-section');

        // Positive Address
        if (scope === 'residence' && currentStatus === 'verified') {
            document.getElementById('residenceFormSection').classList.remove('hidden-section');
        } 
         // Negative / Unknown 
        else if (scope === 'residence' && currentStatus === 'unknown') {
            document.getElementById('residenceUnknownSection').classList.remove('hidden-section');
        }
        // Negative / Closed
        else if (scope === 'residence' && currentStatus === 'closed') {
            document.getElementById('residenceClosedSection').classList.remove('hidden-section');
        }
        // Negative / Unlocated
        else if (scope === 'residence' && currentStatus === 'unlocated') {
            document.getElementById('residenceUnlocatedSection').classList.remove('hidden-section');
        }
        // Negative / Denied
        else if (scope === 'residence' && currentStatus === 'denied') {
            document.getElementById('residenceDeniedSection').classList.remove('hidden-section');
        }


        else if (scope === 'employment' && currentStatus === 'verified') {
            document.getElementById('employmentFormSection').classList.remove('hidden-section');
        } 
        else if (scope === 'employment' && currentStatus === 'unknown') {
            document.getElementById('employmentUnknownSection').classList.remove('hidden-section');
        }

        else if (scope === 'business' && currentStatus === 'verified') {
            document.getElementById('businessFormSection').classList.remove('hidden-section');
        }
        else if (scope === 'business' && currentStatus === 'unknown') {
            document.getElementById('businessUnknownSection').classList.remove('hidden-section');
        }
    });

    // Compilation Submit Logic Engine
    remarksForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const scope = hiddenTypeInput.value;
        const status = statusSelect.value;
        let remarksText = "";

        // RESIDENCE - VERIFIED
        if (scope === 'residence' && status === 'verified') {
            const clientName = document.getElementById('resClientName').value.toUpperCase();
            const talkedTo = document.getElementById('resTalkedTo').value.toUpperCase();
            const matchStatus = document.querySelector('input[name="resConfirmDetails"]:checked').value;
            const incomeType = document.getElementById('resIncomeType').value;
            const srcName = document.getElementById('resSrcName').value.toUpperCase();
            const srcAddress = document.getElementById('resSrcAddress').value.toUpperCase();
            const position = document.getElementById('resPosition').value.toUpperCase();
            const tenure = document.getElementById('resTenure').value.toUpperCase();
            const salaryLabel = document.getElementById('resSalaryLabel').value;
            const salaryVal = document.getElementById('resSalaryValue').value;
            const loanPurpose = document.getElementById('resLoanPurpose').value.toUpperCase();
            const houseOwner = document.getElementById('resHouseOwner').value.toUpperCase();
            const stayLength = document.getElementById('resStayLength').value.toUpperCase();
            const docs = document.getElementById('resDocs').value.toUpperCase();
            const voter = document.getElementById('resVoter').value;
            const resident = document.getElementById('resResident').value;
            const derogatory = document.getElementById('resDerogatory').value;
            const informants = document.getElementById('resInformants').value;
            const fieldman = document.getElementById('resFieldman').value; 
            const note = document.getElementById('resNote').value;

        remarksText = `${clientName} WAS VERIFIED TO BE RESIDING AT THE GIVEN ADDRESS FOR ${stayLength}. THE HOUSE IS OWNED BY ${houseOwner}. FIELDMAN INTERVIEWED ${talkedTo} WHO CONFIRMED ${clientName}'S IDENTITY DETAILS ${matchStatus}. ${clientName} IS CURRENTLY ${incomeType} ${srcName} LOCATED AT ${srcAddress} POSITION AS ${position} WITH A TENURE OF ${tenure} AND A MONTHLY ${salaryLabel} PHP ${salaryVal}. THE PURPOSE OF LOAN IS ${loanPurpose}. UPON BRGY VERIFICATION, ${clientName} IS ${voter} AND ${resident}, WITH ${derogatory}. THE DOCUMENTS PRESENTED ARE ${docs}. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT. ${note ? "\n\nADDITIONAL REMARKS: " + note : ""}`;        
    }
        
    // RESIDENCE - UNKNOWN 
        else if (scope === 'residence' && status === 'unknown') {
            const role = document.getElementById('resUnkRole').value;
            const voter = document.getElementById('resUnkVoter').value;
            const resident = document.getElementById('resUnkResident').value;
            const informants = document.getElementById('resUnkInformants').value;
            const fieldman = document.getElementById('resUnkFieldman').value; 
            const note = document.getElementById('resUnkNote').value;

            remarksText = `THE GIVEN ADDRESS IS LOCATED BUT ACCORDING TO NEIGHBORS, ${role} IS UNKNOWN/UNFAMILIAR RESIDING AT THE DECLARED/GIVEN ADDRESS. ${fieldman} WENT TO NEARBY HOUSES BUT STILL ${role} REMAINED UNKNOWN AND UNFAMILIAR. UPON BRGY CHECKING, ${role} IS ${voter} AND ${resident} BASED ON RECORDS. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
        }

    // RESIDENCE - CLOSED
        else if (scope === 'residence' && status === 'closed') {
            const role = document.getElementById('resClosedRole').value;
            const voter = document.getElementById('resClosedVoter').value;
            const resident = document.getElementById('resClosedResident').value;
            const informants = document.getElementById('resClosedInformants').value;
            const fieldman = document.getElementById('resClosedFieldman').value; 
            const note = document.getElementById('resClosedNote').value;

            remarksText = `THE GIVEN ADDRESS IS LOCATED AND WHEN ${fieldman} WENT FOR A VISIT AT THE AREA, THE HOUSE IS CLOSED. ${fieldman} TRIED TO KNOCK AND CALL OUT SEVERAL/MULTIPLE TIMES BUT REMAINED UNANSWERED. ${fieldman} TALKED WITH A NEIGHBOR WHO POSITIVELY VERIFIED THAT ${role} IS STILL RESIDING AT THE GIVEN ADDRESS. UPON BRGY CHECKING, ${role} IS ${voter} AND ${resident} BASED ON RECORDS. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
        }
    // RESIDENCE - UNLOCATED
        else if (scope === 'residence' && status === 'unlocated') {
            const role = document.getElementById('resUnlocatedRole').value;
            const incompleteAddress = document.getElementById('resUnlocatedAddress').value;
            const voter = document.getElementById('resUnlocatedVoter').value;
            const resident = document.getElementById('resUnlocatedResident').value;
            const informants = document.getElementById('resUnlocatedInformants').value;
            const fieldman = document.getElementById('resUnlocatedFieldman').value;
            const note = document.getElementById('resUnlocatedNote').value;

            remarksText = `THE GIVEN ADDRESS COULD NOT BE LOCATED DUE TO LACK OF ${incompleteAddress}. ${fieldman} WENT ON FROM STARTING POINT TO END POINT OF THE AREA TO ASK INFORMANTS IN THE AREA, IF ${role} IS STILL RESIDING AT THE GIVEN AREA BUT STILL ${role} IS UNKNOWN/UNFAMILIAR. UPON BRGY CHECKING, ${role} IS ${voter} AND ${resident} BASED ON RECORDS. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
        }
        // RESIDENCE - UNLOCATED
            else if (scope === 'residence' && status === 'denied') {
                const role = document.getElementById('resDeniedRole').value;
                const present = document.getElementById('resDeniedPosition').value;
                const voter = document.getElementById('resDeniedVoter').value;
                const resident = document.getElementById('resDeniedResident').value;
                const informants = document.getElementById('resDeniedInformants').value;
                const fieldman = document.getElementById('resDeniedFieldman').value;
                const note = document.getElementById('resDeniedNote').value;

                remarksText = `THE GIVEN ADDRESS IS LOCATED BUT ${fieldman} WAS DENIED ENTRY. TALKED WITH ${present} WHO STATED THAT ${fieldman} CANNOT ENTER WITHOUT PERMISSION OR AUTHORIZATION CONSENT FROM THE ${role}. ALSO, ${fieldman} NEEDS TO CALL ${role} FIRST BEFORE CAN ENTER IN THE AREA. NO OTHER INFORMATION WAS GATHERED. UPON BRGY CHECKING, ${role} IS ${voter} AND ${resident} BASED ON RECORDS. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
            }

        // EMPLOYMENT - LOCATED
        else if (scope === 'employment' && status === 'verified') {
            const clientName = document.getElementById('empClientName').value.toUpperCase();
            const company = document.getElementById('empCompany').value.toUpperCase();
            const empStatus = document.getElementById('empStatus').value;
            const address = document.getElementById('empAddress').value.toUpperCase();
            const hr = document.getElementById('empHR').value.toUpperCase();
            const position = document.getElementById('empPosition').value.toUpperCase();
            const tenure = document.getElementById('empTenure').value.toUpperCase();
            const salary = document.getElementById('empSalary').value;
            const informants = document.getElementById('empInformants').value;
            const fieldman = document.getElementById('empFieldman').value; 
            const note = document.getElementById('empNote').value;

            remarksText = `${clientName} EMPLOYMENT STATUS WAS VERIFIED AS LOCATED AND ACTIVE. ${clientName} IS CURRENTLY WORKING AT ${company} LOCATED AT ${address}. TALKED TO ${hr} WHO CONFIRMED THAT ${clientName} HOLDS THE POSITION AS ${position} ON A ${empStatus} STATUS FOR ${tenure}, ${clientName} MONTHLY INCOME IS PHP ${salary}. NO OTHER INFORMATION WAS GATHERED AND ${informants} REFUSED TO TAKE SELFIE WITH ${fieldman}'s visit. ${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
        } 

        // EMPLOYMENT - UNKNOWN
        else if (scope === 'employment' && status === 'unknown') {
            const clientName = document.getElementById('empUnkClientName').value.toUpperCase();
            const talkedwith = document.getElementById('empUnkTalkedWith').value.toUpperCase();
            const informants = document.getElementById('empUnkInformants').value;
            const fieldman = document.getElementById('empUnkFieldman').value; 
            const note = document.getElementById('empUnkNote').value;

            remarksText = `THE GIVEN EMPLOYER ADDRESS IS LOCATED BUT ${clientName} IS UNKNOWN/UNFAMILIAR EMPLOYEE AT THE GIVEN ADDRESS. TALKED WITH ${talkedwith} WHO STATED THAT ${clientName} IS NOT EMPLOYEE AT THE GIVEN COMPANY BASED ON RECORDS. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
            }

        // BUSINESS - LOCATED
        else if (scope === 'business' && status === 'verified') {
            const busName = document.getElementById('busName').value.toUpperCase();
            const busType = document.getElementById('busType').value.toUpperCase();
            const busAddress = document.getElementById('busAddress').value.toUpperCase();
            const informant = document.getElementById('busInformant').value.toUpperCase();
            const years = document.getElementById('busYears').value.toUpperCase();
            const revenue = document.getElementById('busRevenue').value;
            const permits = document.getElementById('busPermits').value.toUpperCase();

            remarksText = `APPLICANT'S COMMERCIALLY TRADING ENTERPRISE WAS VERIFIED AS LOCATED AND OPERATIONAL. OPERATING UNDER SIGNAGE DESIGNATION "${busName}" (${busType}) SITUATED AT ${busAddress}. STATED TIMELINE HISTORY LENGTH SHOWS OPEN TRADING STATUS FOR ${years}. INTERVIEWED CORRESPONDENT SOURCE ${informant} WHO CONFIRMED ESTIMATED GROSS SALES OF PHP ${revenue} MONTHLY. SYSTEM PERMITS REVEALED: ${permits}.`;
        }
        // BUSINESS - UNKNOWN
        else if (scope === 'business' && status === 'unknown') {
            const role = document.getElementById('busUnkRole').value;
            const signage = document.getElementById('busUnkSignage').value.toUpperCase() || "STATED COMMERCIALLY TRADING SIGNAGE";

            remarksText = `BUSINESS VERIFICATION: FCV DEPLOYED TO TARGET FIELD REGION TO VERIFY THE TRADING STATUS OF "${signage}". SECTOR RECONNAISSANCE AND NEIGHBORHOOD ENQUIRIES CONFIRMED THAT THE BUSINESS ESTABLISHMENT IS UNKNOWN AND UNLOCATED WITHIN THE LOCALLY MAPPED AREA. NEIGHBORS AND NEARBY COMMERCIAL STALL OPERATORS ARE UNFAMILIAR WITH (${role}) OR THE BUSINESS TRADING NAME.`;
        }
        // DEFAULT FALLBACK OUTCOME
        else {
            const activeCardText = document.querySelector(`#scopeCardGroup .card[data-value="${scope}"] .card-title`).innerText;
            const activeStatusText = statusSelect.options[statusSelect.selectedIndex].text;
            remarksText = `${activeCardText.toUpperCase()}: FIELD TARGET ATTEMPT GENERATED STATUS RESULT OUTCOME -> ${activeStatusText.toUpperCase()}. APPLICATION PROFILE CANNOT PROCEED UNTIL DISCREPANCIES CLEAR.`;
        }

        generatedRemarksBox.value = remarksText;
        outputContainer.classList.remove('hidden-section');
        outputContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Clipboard Copy Helper Block
    copyTextBtn.addEventListener('click', function() {
        generatedRemarksBox.select();
        navigator.clipboard.writeText(generatedRemarksBox.value);
        
        const origText = copyTextBtn.innerText;
        copyTextBtn.innerText = "Copied!";
        copyTextBtn.classList.replace('btn-light', 'btn-warning');
        setTimeout(() => {
            copyTextBtn.innerText = origText;
            copyTextBtn.classList.replace('btn-warning', 'btn-light');
        }, 1000);
    });

    function hideAllFormSections() {
        const sections = [
            'residenceFormSection', 'residenceUnknownSection', 'residenceClosedSection', 'residenceUnlocatedSection', 'residenceDeniedSection',
            'employmentFormSection', 'employmentUnknownSection',
            'businessFormSection', 'businessUnknownSection'
        ];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden-section');
        });
    }
});