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
            { value: "unknown", text: "Unknown Employee / Not Connected" },
            { value: "closed", text: "Employer Closed" },
            { value: "unlocated", text: "Employer Unlocated / Unknown" },
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

        // Positive Employment
        else if (scope === 'employment' && currentStatus === 'verified') {
            document.getElementById('employmentFormSection').classList.remove('hidden-section');
        } 
        // Unknown Employment
        else if (scope === 'employment' && currentStatus === 'unknown') {
            document.getElementById('employmentUnknownSection').classList.remove('hidden-section');
        }
        // Closed Employment
        else if (scope === 'employment' && currentStatus === 'closed') {
            document.getElementById('employmentClosedSection').classList.remove('hidden-section');
        }
        // Denied Employment
        else if (scope === 'employment' && currentStatus === 'denied') {
            document.getElementById('employmentDeniedSection').classList.remove('hidden-section');
        }
        // UNLOCATED Employment
        else if (scope === 'employment' && currentStatus === 'unlocated') {
            document.getElementById('employmentUnlocatedSection').classList.remove('hidden-section');
        }
        // Resigned Employment
        else if (scope === 'employment' && currentStatus === 'resigned') {
            document.getElementById('employmentResignedSection').classList.remove('hidden-section');
        }

        // Business - Positive
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

        // EMPLOYMENT - CLOSED
        else if (scope === 'employment' && status === 'closed') {
            const clientName = document.getElementById('empClosedClientName').value.toUpperCase();
            const operates = document.getElementById('empClosedOperates').value;
            const familiar = document.getElementById('empClosedFamiliar').value;
            const time = document.getElementById('empClosedTime').value;
            const talkedwith = document.getElementById('empClosedTalkedWith').value.toUpperCase();
            const informants = document.getElementById('empClosedInformants').value;
            const fieldman = document.getElementById('empClosedFieldman').value;
            const note = document.getElementById('empClosedNote').value;

            remarksText = `THE GIVEN EMPLOYER ADDRESS IS LOCATED AND SUBJECT IS ${familiar} CONNECTED TO THE GIVEN COMPANY. TALKED WITH ${talkedwith} WHO STATED THAT EMPLOYER IS CLOSED TODAY AND ${talkedwith} STATING THAT EMPLOYER IS OPERATES EVERY ${operates} FROM ${time}. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
            }
        // EMPLOYMENT - DENIED ENTRY
        else if (scope === 'employment' && status === 'denied') {
            const clientName = document.getElementById('empDeniedClientName').value.toUpperCase();
            const talkedwith = document.getElementById('empDeniedTalkedWith').value.toUpperCase();
            const informants = document.getElementById('empDeniedInformants').value;
            const property = document.getElementById('empDeniedProperty').value;
            const familiar = document.getElementById('empDeniedFamiliar').value;
            const fieldman = document.getElementById('empDeniedFieldman').value;
            const note = document.getElementById('empDeniedNote').value;

            remarksText = `THE GIVEN ADDRESS IS LOCATED BUT UPON VISIT ${fieldman} WAS DENIED ENTRY. TALKED WITH ${talkedwith} WHO STATED THAT ${fieldman} CANNOT ENTER IN THE ${property} DUE TO COMPANY PROTOCOLS AND NEED TO CALL FIRST THE COMPANY BEFORE ENTERING THE ${property}. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
            }
        // EMPLOYMENT - RESISGNED
        else if (scope === 'employment' && status === 'resigned') {
            const clientName = document.getElementById('empResignedClientName').value.toUpperCase();
            const talkedwith = document.getElementById('empResignedTalkedWith').value.toUpperCase();
            const informants = document.getElementById('empResignedInformants').value;
            const years = document.getElementById('empResignedYears').value;
            const fieldman = document.getElementById('empResignedFieldman').value;
            const note = document.getElementById('empResignedNote').value;

            remarksText = `THE GIVEN EMPLOYER ADDRESS IS LOCATED AND TALKED WITH ${talkedwith} WHO STATED THE ${clientName} IS THEIR FORMER EMPLOYEE AT THE COMPANY. ${clientName} IS ALREADY RESIGNED FOR ${years} AGO. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
            }

        // EMPLOYMENT - UNLOCATED
        else if (scope === 'employment' && status === 'unlocated') {
            const clientName = document.getElementById('empUnlocatedClientName').value.toUpperCase();
            const talkedwith = document.getElementById('empUnlocatedTalkedWith').value.toUpperCase();
            const informants = document.getElementById('empUnlocatedInformants').value;
            const verification = document.getElementById('empUnlocatedVerification').value;
            const visit = document.getElementById('empUnlocatedVisitation').value;
            const fieldman = document.getElementById('empUnlocatedFieldman').value;
            const note = document.getElementById('empUnlocatedNote').value;

            remarksText = `THE GIVEN EMPLOYER ADDRESS WAS ${visit} LOCATED; HOWEVER, UPON VERIFICATION IN THE AREA, TALKED TO ${talkedwith} THAT THE ${clientName}'S EMPLOYER NAME HAD NO IDEA WE'RE BEEN OPERATING AND NOT FAMILIAR OF EMPLOYER NAME. UPON BRGY VERIFICATION, THE EMPLOYER IS ${verification} AT THE BRGY AND HAS NO RECORD. ${informants} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
            }


        // BUSINESS - LOCATED
        else if (scope === 'business' && status === 'verified') {
            const name = document.getElementById('busVerifiedClientName').value.toUpperCase();
            const verified = document.getElementById('busVerifiedName').value.toUpperCase();
            const busname = document.getElementById('busName').value.toUpperCase();
            const address = document.getElementById('busAddress').value.toUpperCase();
            const informant = document.getElementById('busInformants').value.toUpperCase();
            const operating = document.getElementById('busOperating').value.toUpperCase();
            const income = document.getElementById('busIncome').value;
            const signage = document.getElementById('busSignage').value;
            const open = document.getElementById('busOpen').value;
            const time = document.getElementById('busTime').value;
            const knownoperating = document.getElementById('busKnownOperating').value;
            const verification = document.getElementById('busVerification').value;
            const fieldman = document.getElementById('busFieldman').value;
            const note = document.getElementById('busNote').value;
            const permits = document.getElementById('busPermits').value.toUpperCase();

            remarksText = `${name}'s BUSINESS IS VERIFIED OPERATIONAL AT THE GIVEN ADDRESS AND OWNED BY ${name}. BV DONE THRU ${verified} WHO SPELLED OUT BUSINESS NAME CORRECTLY. BUSINESS NAMED IS ${busname} LOCATED AT ${address} AND BUSINESS IS OPERATES FOR ${operating} WITH MONTHLY GROSS INCOME OF ${income}. BUSINESS IS HAS ${signage} AND IT OPERATE'S FROM ${open} TO ${time}. THE DOCUMENTS WAS PRESENTED AREA ${permits}. AS PER INFORMANT IN THE AREA, BUSINESS IS ${knownoperating} IN THE AREA. AS PER BRGY INFORMANT BUSINESS IS ${verification} BASED ON RECORDS. ${informant} REFUSED TO TAKE SELFIE PICTURE WITH ${fieldman} AND NO OTHER INFORMATION WAS GATHERED OF ${fieldman}'S VISIT.${note ? "\n\nADDITIONAL REMARKS:\n" + note : ""}`;
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
            'employmentFormSection', 'employmentUnknownSection', 'employmentClosedSection', 'employmentUnlocatedSection', 'employmentDeniedSection', 'employmentResignedSection',
            'businessFormSection', 'businessUnknownSection'
        ];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden-section');
        });
    }
});